import type { ReactNode } from "react";
import { CONTACT } from "./content";

/** Brand glyphs, drawn to a common 24px box so they sit optically even at any size. */
const GLYPHS: Record<string, ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 8.5h2.2V5.6h-2.4c-2.3 0-3.6 1.4-3.6 3.7v1.6H8.5v3h2.2V21h3.1v-7.1h2.3l.4-3h-2.7v-1.3c0-.7.2-1.1 1-1.1Z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.5 10.5V17M7.5 7.4v.1M11.5 17v-3.6c0-1.1.8-2 1.9-2s2.1.7 2.1 2.2V17" />
    </>
  ),
  whatsapp: (
    <path d="M20 11.7a8 8 0 0 1-11.9 7L4 20l1.4-4a8 8 0 1 1 14.6-4.3Zm-11.4-3c-.2.4-.5 1.4.4 2.6a7 7 0 0 0 3.4 2.6c1.2.4 1.8.2 2.2-.1.3-.3.5-.9.4-1.2l-1.4-.7c-.2 0-.4.4-.6.6-.2.2-.4.2-.7 0a5 5 0 0 1-2-2c-.2-.3 0-.5.1-.7l.4-.5-.7-1.5c-.2-.2-1.1-.3-1.5.1Z" />
  ),
};

export type Social = {
  name: string;
  handle: string;
  href: string;
  glyph: ReactNode;
};

export const SOCIALS: Social[] = [
  {
    name: "Instagram",
    handle: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    glyph: GLYPHS.instagram,
  },
  {
    name: "Facebook",
    handle: CONTACT.facebookHandle,
    href: CONTACT.facebook,
    glyph: GLYPHS.facebook,
  },
  {
    name: "LinkedIn",
    handle: CONTACT.linkedinHandle,
    href: CONTACT.linkedin,
    glyph: GLYPHS.linkedin,
  },
  {
    name: "WhatsApp",
    handle: CONTACT.whatsappHandle,
    href: CONTACT.whatsapp,
    glyph: GLYPHS.whatsapp,
  },
];

export function SocialGlyph({
  glyph,
  className = "h-[19px] w-[19px]",
}: {
  glyph: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyph}
    </svg>
  );
}
