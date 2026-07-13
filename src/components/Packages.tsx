import Reveal from "./Reveal";
import { PACKAGES, packageEnquiry } from "@/lib/content";

export default function Packages() {
  return (
    <section id="packages" className="relative bg-[#2c1053] py-28 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label text-[#f8e71c]">
              Packages
            </p>
            <h2 className="heading mt-6 text-[clamp(2.5rem,5.6vw,4.4rem)] text-white">
              Pick your weave.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-sm text-lg leading-relaxed text-white/65">
              Monthly retainers. No lock-in, no fine print. Move up a tier the
              month you outgrow the one you&rsquo;re on.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const featured = pkg.featured === true;

            return (
              <Reveal
                key={pkg.name}
                delay={i * 110}
                className={
                  featured
                    ? "relative flex flex-col rounded-3xl bg-white p-9 text-[#2c1053] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)] lg:-mt-6 lg:mb-6"
                    : "relative flex flex-col rounded-3xl border border-white/15 bg-white/[0.04] p-9 text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#f8e71c]/50"
                }
              >
                {pkg.badge && (
                  <span
                    className={`label absolute -top-3 left-9 rounded-full px-4 py-1.5 ${
                      featured
                        ? "bg-[#f8e71c] text-[#2c1053]"
                        : "bg-[#743ac8] text-white"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                )}

                <h3
                  className={`heading text-4xl ${
                    featured ? "text-[#4c1b8f]" : "text-white"
                  }`}
                >
                  {pkg.name}
                </h3>

                <p
                  className={`mt-4 min-h-[3.5rem] leading-relaxed ${
                    featured ? "text-[#2c1053]/70" : "text-white/60"
                  }`}
                >
                  {pkg.pitch}
                </p>

                <hr
                  className={`mt-8 border-0 ${
                    featured ? "thread-rule" : "h-px bg-white/12"
                  }`}
                />

                <ul className="mt-8 flex flex-1 flex-col gap-3.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      {/* Drawn as a thread with a stitched tail, but it has to
                          read as "included" first, so it's a tick, not a cross. */}
                      <svg
                        aria-hidden
                        viewBox="0 0 14 14"
                        className="mt-[6px] h-3 w-3 shrink-0"
                      >
                        <path
                          d="M1.5 7.5 L5 11 L12.5 3"
                          fill="none"
                          stroke={featured ? "#743ac8" : "#f8e71c"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={
                          featured ? "text-[#2c1053]/85" : "text-white/80"
                        }
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Opens WhatsApp with the whole enquiry already typed: the
                    package, what's in it, and the ask for a price. */}
                <a
                  href={packageEnquiry(pkg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`label group mt-10 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-4 transition-transform duration-200 hover:-translate-y-0.5 ${
                    featured
                      ? "bg-[#4c1b8f] text-white"
                      : "border border-white/25 text-white hover:border-[#f8e71c] hover:text-[#f8e71c]"
                  }`}
                >
                  Ask about {pkg.name}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={140}>
          <p className="label mt-12 text-center text-white/40">
            Every package includes 1 weekly site visit
          </p>
        </Reveal>
      </div>
    </section>
  );
}
