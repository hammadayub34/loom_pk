export type Client = {
  name: string;
  logo: string;
  /** Intrinsic size of the trimmed logo, so the tile reserves its space. */
  width: number;
  height: number;
  /**
   * The ground the mark was drawn for, and the colour its tile is painted.
   * They can't share one: NUCES, TBS, VU, Mall of Gujranwala and Oresto are
   * drawn for dark and vanish on white; the rest are drawn for light. Painting
   * the tile to match means the logo sits in it seamlessly, and it spares us
   * repainting someone else's mark to fit our palette -- which isn't ours to do.
   */
  ground: string;
  /**
   * A logo whose own background is a gradient (TBS). No flat tile colour can
   * match it, so it keeps its background and fills the tile with it rather than
   * showing a seam where its box meets ours.
   */
  fill?: boolean;

  /** Rendered only when present. Nothing here is invented. */
  work?: string;
  result?: string;
};

export const CLIENTS: Client[] = [
  {
    name: "Army Public Schools Gujranwala",
    logo: "/clients/army-public-schools-gujranwala.png",
    width: 284,
    height: 290,
    ground: "#ffffff",
  },
  {
    name: "Beaconhouse School System",
    logo: "/clients/beaconhouse-school-system.png",
    width: 372,
    height: 440,
    ground: "#ffffff",
  },
  {
    name: "Carrefour",
    logo: "/clients/carrefour.png",
    width: 303,
    height: 239,
    ground: "#ffffff",
  },
  {
    name: "Cornerstone School & College",
    logo: "/clients/cornerstone-school-and-college.png",
    width: 392,
    height: 389,
    ground: "#ffffff",
  },
  {
    name: "Corps Gujranwala",
    logo: "/clients/corps-gujranwala.png",
    width: 404,
    height: 403,
    ground: "#ffffff",
  },
  {
    name: "HQ 30 Corps",
    logo: "/clients/hq-30-corps.png",
    width: 133,
    height: 133,
    ground: "#fcfcfc",
  },
  {
    name: "LGS",
    logo: "/clients/lgs.png",
    width: 312,
    height: 384,
    ground: "#ffffff",
  },
  {
    name: "Mall of Gujranwala",
    logo: "/clients/mall-of-gujranwala.png",
    width: 339,
    height: 237,
    ground: "#2a2a2a",
  },
  {
    name: "NUCES FAST",
    logo: "/clients/nuces-fast.png",
    width: 381,
    height: 381,
    ground: "#000000",
  },
  {
    name: "Oresto Pizza",
    logo: "/clients/oresto-pizza.png",
    width: 239,
    height: 247,
    ground: "#0c0606",
  },
  {
    name: "Pakistan Army",
    logo: "/clients/pakistan-army.png",
    width: 384,
    height: 440,
    ground: "#fcfcfc",
  },
  {
    name: "PSCA",
    logo: "/clients/psca.png",
    width: 271,
    height: 250,
    ground: "#ffffff",
  },
  {
    name: "QDPS",
    logo: "/clients/qdps.png",
    width: 316,
    height: 382,
    ground: "#ffffff",
  },
  {
    name: "SOIES Group",
    logo: "/clients/soies-group.png",
    width: 400,
    height: 400,
    ground: "#ffffff",
  },
  {
    name: "TBS",
    logo: "/clients/tbs.png",
    width: 440,
    height: 440,
    ground: "#183642",
    fill: true,
  },
  {
    name: "The City School",
    logo: "/clients/the-city-school.png",
    width: 440,
    height: 371,
    ground: "#ffffff",
  },
  {
    name: "The College of Law",
    logo: "/clients/the-college-of-law.png",
    width: 293,
    height: 317,
    ground: "#ffffff",
  },
  {
    name: "The Noor School",
    logo: "/clients/the-noor-school.png",
    width: 96,
    height: 155,
    ground: "#ffffff",
  },
  {
    name: "TMUC",
    logo: "/clients/tmuc.png",
    width: 274,
    height: 273,
    ground: "#ffffff",
  },
  {
    name: "UKS Solar Company",
    logo: "/clients/uks-solar.png",
    width: 157,
    height: 110,
    ground: "#ffffff",
  },
  {
    name: "UMT",
    logo: "/clients/umt.png",
    width: 440,
    height: 172,
    ground: "#ffffff",
  },
  {
    name: "University of Chenab",
    logo: "/clients/university-of-chenab.png",
    width: 384,
    height: 383,
    ground: "#ffffff",
  },
  {
    name: "Vital Group of Colleges",
    logo: "/clients/vital-group-of-colleges.png",
    width: 144,
    height: 274,
    ground: "#ffffff",
  },
  {
    name: "VU",
    logo: "/clients/vu.png",
    width: 200,
    height: 133,
    ground: "#004ea2",
  },
];
