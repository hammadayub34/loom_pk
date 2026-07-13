import Image from "next/image";
import Reveal from "./Reveal";
import { CONTACT } from "@/lib/content";
import { SOCIALS, SocialGlyph } from "@/lib/socials";

/**
 * He appears once at any given width: beside the socials on a phone, out in his
 * own column from `sm` up. The two placements are mutually exclusive (`sm:hidden`
 * against `hidden sm:block`), so only one is ever displayed, only one is in the
 * accessibility tree, and the browser fetches the single shared source once.
 */
function Mascot({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/loom_mascot_cut.png"
      alt="The LOOM mascot, in spectacles, holding a shuttle"
      width={154}
      height={364}
      className={`h-auto drop-shadow-[0_30px_45px_rgba(0,0,0,0.4)] ${className}`}
    />
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="grain weave-bg relative isolate overflow-hidden bg-[#4c1b8f] py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-[#f8e71c]">Contact</p>
              <h2 className="heading mt-5 max-w-2xl text-[clamp(2.1rem,7vw,5rem)] text-white">
                Loose threads?{" "}
                <span className="text-[#f8e71c]">Let&rsquo;s make fabric.</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#f8e71c] px-7 py-4 text-[#2c1053] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  WhatsApp us
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={`tel:${CONTACT.phoneIntl}`}
                  className="label inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 py-4 text-white transition-colors duration-200 hover:border-[#f8e71c] hover:text-[#f8e71c]"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
              <Reveal delay={180}>
                <p className="label text-white/45">Studio</p>
                <address className="mt-4 text-lg leading-relaxed text-white/85 not-italic">
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                  <br />
                  {CONTACT.address.line3}
                </address>
              </Reveal>

              {/* On a phone he stands next to the handles, bottoms aligned, using
                  the empty column the narrow list leaves behind. */}
              <div className="flex items-end justify-between gap-5 sm:block">
                <Reveal delay={240} className="min-w-0 flex-1">
                  <p className="label text-white/45">Find us</p>
                  <ul className="mt-4 flex flex-col gap-1">
                    {SOCIALS.map((social) => (
                      <li key={social.name}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 text-white/85 transition-colors hover:text-[#f8e71c]"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors group-hover:border-[#f8e71c] group-hover:text-[#f8e71c]">
                            <SocialGlyph
                              glyph={social.glyph}
                              className="h-[17px] w-[17px]"
                            />
                          </span>
                          <span className="min-w-0 truncate text-lg">
                            {social.handle}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={300} className="shrink-0 sm:hidden">
                  <Mascot className="w-[112px]" />
                </Reveal>
              </div>
            </div>
          </div>

          <Reveal
            delay={200}
            className="hidden justify-self-center sm:block lg:justify-self-end"
          >
            <Mascot className="w-[190px] md:w-[240px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
