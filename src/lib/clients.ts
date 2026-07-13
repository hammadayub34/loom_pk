export type Client = {
  name: string;
  sector: string;
  logo: string;
  /** Intrinsic size of the cut logo, so the tile reserves its space. */
  width: number;
  height: number;
  /**
   * The ground the mark was drawn for. Its tile supplies that same colour back,
   * so any pixel the transparency key took lands on an identical background and
   * can't read as a hole. Oresto's plate is drawn in white line-art and would
   * disappear on a light tile; UKS carries a JPEG halo on anything but white.
   */
  ground: "light" | "ink";

  /** Optional, and rendered only when present. Nothing here is invented: an
   *  engagement gets a line on this page once there's a real one to describe. */
  work?: string;
  result?: string;
};

export const CLIENTS: Client[] = [
  {
    name: "UKS Solar Company",
    sector: "Solar energy",
    logo: "/clients/uks_solar.png",
    width: 167,
    height: 126,
    ground: "light",
  },
  {
    name: "Oresto Pizza",
    sector: "Restaurant · Gujranwala",
    logo: "/clients/oresto_pizza.png",
    width: 239,
    height: 252,
    ground: "ink",
  },
];
