import { SOCIALS, SocialGlyph } from "@/lib/socials";

/** Icon-only row, used in the nav where there's no room for handles. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {SOCIALS.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-[#f8e71c]"
          >
            <SocialGlyph glyph={social.glyph} />
          </a>
        </li>
      ))}
    </ul>
  );
}
