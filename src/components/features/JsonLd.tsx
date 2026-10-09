import { home, settings, siteUrl, indexable } from "@/lib/content";
import { pages } from "@/lib/pages";
import data from "../../../content/sider.json";
export function JsonLd({ slug }: { slug: (typeof pages)[number]["slug"] }) {
  if (!indexable || slug === "privatliv") return null;
  const page = pages.find((p) => p.slug === slug)!;
  const content = slug === "forside" ? home : data[slug as keyof typeof data];
  const url = siteUrl + page.path;
  const service = slug === "byg-nyt" || slug === "toemrerarbejde";
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": siteUrl + "/#organization",
      name: settings.name,
      url: siteUrl + "/",
      logo: siteUrl + "/images/logo/Logo-hjemmeside-1.png",
      telephone: settings.phoneLink,
      email: settings.email,
      founder: { "@type": "Person", name: settings.founder },
    },
    {
      "@type": "WebSite",
      "@id": siteUrl + "/#website",
      url: siteUrl + "/",
      name: settings.name,
    },
    {
      "@type": "WebPage",
      "@id": url + "#webpage",
      url,
      name: content.h1,
      dateModified: content.lastUpdated,
      isPartOf: { "@id": siteUrl + "/#website" },
      ...(service ? { mainEntity: { "@id": url + "#service" } } : {}),
      ...(page.parent ? { breadcrumb: { "@id": url + "#breadcrumb" } } : {}),
    },
  ];
  if (page.parent)
    graph.push({
      "@type": "BreadcrumbList",
      "@id": url + "#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Forside",
          item: siteUrl + "/",
        },
        { "@type": "ListItem", position: 2, name: page.name, item: url },
      ],
    });
  if (service)
    graph.push({
      "@type": "Service",
      "@id": url + "#service",
      url,
      name: content.h1,
      provider: { "@id": siteUrl + "/#organization" },
      areaServed: settings.area,
    });
  if (slug === "forside") {
    graph.push(
      {
        "@type": "GeneralContractor",
        "@id": siteUrl + "/#business",
        name: settings.name,
        url: siteUrl + "/",
        telephone: settings.phoneLink,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          postalCode: "8370",
          addressLocality: "Hadsten",
          addressCountry: "DK",
        },
        areaServed: settings.area,
      },
      {
        "@type": "FAQPage",
        "@id": url + "#faq",
        mainEntity: home.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    );
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
