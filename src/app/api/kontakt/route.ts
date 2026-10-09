import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { Resend } from "resend";
import { createHash } from "node:crypto";
import { contactSchema } from "@/lib/contact";
const error = (status: number) =>
  NextResponse.json({ error: "Henvendelsen kunne ikke sendes." }, { status });
export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const expected = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  if (origin !== new URL(expected).origin) return error(403);
  if (req.headers.get("content-type")?.split(";")[0] !== "application/json")
    return error(415);
  if (Number(req.headers.get("content-length") || 0) > 16000) return error(413);
  let raw = "";
  try {
    const reader = req.body?.getReader();
    if (!reader) return error(400);
    let bytes = 0;
    const decoder = new TextDecoder();
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 16000) {
        await reader.cancel();
        return error(413);
      }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return error(400);
  }
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return error(400);
  }
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) return error(400);
  if (parsed.data.website) return new NextResponse(null, { status: 204 });
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_FROM ||
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  )
    return error(503);
  try {
    const redis = Redis.fromEnv();
    const ip =
      req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const identity = createHash("sha256").update(ip).digest("hex");
    for (const [prefix, limit, window] of [
      ["burst", 3, "1 m"],
      ["hour", 10, "1 h"],
      ["day", 20, "1 d"],
    ] as const) {
      const limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, window),
        prefix: `linhave:${prefix}`,
      });
      const result = await limiter.limit(identity);
      if (!result.success)
        return NextResponse.json(
          { error: "Vent lidt, og prøv igen." },
          {
            status: 429,
            headers: {
              "Retry-After": String(
                Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
              ),
            },
          },
        );
    }
    const d = parsed.data;
    const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO || "kontakt@linhave.dk",
      replyTo: d.email,
      subject: `Henvendelse: ${d.subject}`,
      text: `Navn: ${d.name}\nE-mail: ${d.email}\nTelefon: ${d.phone || "Ikke oplyst"}\n\n${d.message}`,
    });
    if (result.error) return error(502);
    return new NextResponse(null, { status: 204 });
  } catch {
    return error(503);
  }
}
export async function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
