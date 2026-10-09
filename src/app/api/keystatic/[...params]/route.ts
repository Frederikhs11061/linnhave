import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
const handler = makeRouteHandler({ config });
export const GET: typeof handler.GET = async (...args) =>
  process.env.NODE_ENV === "development"
    ? handler.GET(...args)
    : new Response(null, { status: 404 });
export const POST: typeof handler.POST = async (...args) =>
  process.env.NODE_ENV === "development"
    ? handler.POST(...args)
    : new Response(null, { status: 404 });
