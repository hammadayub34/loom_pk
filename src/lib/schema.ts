import { CONTACT, PACKAGES, SERVICES, SITE_URL } from "./content";

/**
 * Structured data for the agency itself.
 *
 * "Marketing agency Gujranwala" is the phrase this site is trying to win, and a
 * local search result is assembled from exactly this: a real street address, a
 * dialable number, and the profiles that corroborate them. Built from the same
 * constants the page renders, so the markup can't quietly drift from the copy.
 */
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "LOOM",
  description:
    "LOOM is a marketing agency in Gujranwala that weaves strategy, story, design, events and reach into one fabric. Digital, events, PR, web and print.",
  slogan: "Where every brand becomes stronger.",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/loom_mark.png`,
  image: `${SITE_URL}/brand/og.png`,
  telephone: CONTACT.phoneIntl,
  priceRange: "PKR 50,000–100,000",
  currenciesAccepted: "PKR",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${CONTACT.address.line1}, ${CONTACT.address.line2}`,
    addressLocality: "Gujranwala",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: {
    "@type": "City",
    name: "Gujranwala",
  },
  sameAs: [CONTACT.instagram, CONTACT.facebook, CONTACT.linkedin],
  knowsAbout: SERVICES.map((service) => service.title),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Monthly retainers",
    itemListElement: PACKAGES.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: pkg.pitch,
      price: pkg.price.replace(/,/g, ""),
      priceCurrency: pkg.currency,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: pkg.price.replace(/,/g, ""),
        priceCurrency: pkg.currency,
        billingIncrement: 1,
        unitCode: "MON", // per month
      },
      itemOffered: {
        "@type": "Service",
        name: `${pkg.name} retainer`,
        serviceType: "Marketing",
      },
    })),
  },
};
