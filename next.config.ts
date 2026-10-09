import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  images: { qualities: [70, 85], remotePatterns: [] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/byg-nyt-hus-arkitekttegnet-nybyggeri-nybyg-processen",
        destination: "/processen",
        permanent: true,
      },
      {
        source: "/arkitekttegnet-nybyg-byg-nyt-hus-nybyggeri",
        destination: "/om-linhave",
        permanent: true,
      },
      {
        source: "/nybyg-inspiration-nybyggeri-arkitekttegnet",
        destination: "/inspiration",
        permanent: true,
      },
      {
        source: "/byg-nyt-hus-nybyg-nybyggeri",
        destination: "/kontakt",
        permanent: true,
      },
    ];
  },
};
export default config;
