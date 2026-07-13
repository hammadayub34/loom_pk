export const SITE_URL = "https://loom.pk";

export const CONTACT = {
  phone: "03027542741",
  phoneIntl: "+923027542741",
  whatsapp: "https://wa.me/923027542741",
  instagram: "https://instagram.com/loom_ots",
  instagramHandle: "@loom_ots",
  facebook: "https://www.facebook.com/people/Loompk/61591721756886/",
  facebookHandle: "Loom.pk",
  linkedin: "https://www.linkedin.com/in/loom-pk-b33a5341b/",
  linkedinHandle: "LOOM PK",
  whatsappHandle: "0302 754 2741",
  address: {
    line1: "Apartment 2, Building 35 (Eman Plaza)",
    line2: "Neelum Commercial, DC Colony",
    line3: "Gujranwala Cantt",
  },
} as const;

export const DISCIPLINES = [
  "Digital",
  "Events",
  "PR",
  "Web",
  "Print",
] as const;

export const SERVICES = [
  {
    title: "Digital Marketing",
    body: "Strategy, social, campaigns. Paid and organic growth that compounds instead of spiking.",
    thread: "Strategy",
  },
  {
    title: "Events",
    body: "Activations and experiences that put your brand in the same room as the people who matter.",
    thread: "Story",
  },
  {
    title: "Public Relations",
    body: "Reputation, story placement, strategic communication. We get you talked about on purpose.",
    thread: "Reach",
  },
  {
    title: "Website Development",
    body: "Brand-consistent, conversion-focused builds. Fast, and unmistakably yours.",
    thread: "Design",
  },
  {
    title: "Print",
    body: "Collateral and physical touchpoints that carry the same voice as everything on screen.",
    thread: "Craft",
  },
] as const;

export const PILLARS = [
  {
    name: "Weave",
    principle: "We connect, not decorate",
    body: "Every asset ties back to one strategy. Nothing floats loose.",
  },
  {
    name: "Tension",
    principle: "High contrast on purpose",
    body: "Deep violet against voltage yellow. We hold opposites in balance.",
  },
  {
    name: "Craft",
    principle: "Classic art, modern edge",
    body: "Timeless composition, disrupted with contemporary graphic overlays.",
  },
  {
    name: "Strength",
    principle: "Built to last",
    body: "Brands leave stronger than they arrived. That's the measure.",
  },
] as const;

export type Package = {
  name: string;
  pitch: string;
  badge?: string;
  featured?: boolean;
  includes: string[];
};

export const PACKAGES: Package[] = [
  {
    name: "Starter",
    pitch: "Get the threads in order. A steady, consistent presence, every month.",
    includes: [
      "12 creative posts",
      "8 stories",
      "1 weekly site visit",
      "Basic community management",
      "Content calendar",
      "Monthly report",
    ],
  },
  {
    name: "Growth",
    pitch: "Add motion and intent. Reels, research, and a strategy that moves each month.",
    badge: "Most popular",
    featured: true,
    includes: [
      "16 creative posts",
      "12 stories",
      "4 reels",
      "1 weekly site visit",
      "Community management",
      "Monthly strategy",
      "Trend research",
      "Competitor analysis",
      "Performance report",
    ],
  },
  {
    name: "Premium",
    pitch: "The full loom. Campaign planning, priority everything, nothing left loose.",
    badge: "Best value",
    includes: [
      "20 creative posts",
      "16 stories",
      "8 reels",
      "1 weekly site visit",
      "Priority editing",
      "Advanced community management",
      "Creative campaign planning",
      "Monthly strategy session",
      "Trend research",
      "Competitor analysis",
      "Performance report",
      "Priority support",
    ],
  },
];

/**
 * A WhatsApp deep link that arrives as a real enquiry rather than a bare "hi".
 *
 * The card no longer prints a price, so the message has to carry everything the
 * conversation needs to start: which package, exactly what the visitor read in
 * it, and the ask. Built from `includes` itself, so the message can never
 * describe a package the card doesn't.
 */
export function packageEnquiry(pkg: Package) {
  const message = [
    `Hi LOOM, I'm interested in the ${pkg.name} package.`,
    "",
    "What it includes:",
    ...pkg.includes.map((item) => `• ${item}`),
    "",
    "Could you share the pricing and how we'd get started?",
  ].join("\n");

  return `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}
