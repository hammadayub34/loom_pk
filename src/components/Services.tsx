import Reveal from "./Reveal";
import { SERVICES } from "@/lib/content";

export default function Services() {
  return (
    <section
      id="work"
      className="grain weave-bg relative isolate overflow-hidden bg-[#4c1b8f] py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label text-[#f8e71c]">
              What we do
            </p>
            <h2 className="heading mt-6 max-w-xl text-[clamp(2.5rem,5.6vw,4.4rem)] text-white">
              Five threads. One fabric.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-sm text-lg leading-relaxed text-white/65">
              One strategy, woven consistently across every channel, so the
              pattern stays the same wherever your brand shows up.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 border-t border-white/15">
          {SERVICES.map((service, i) => (
            <Reveal
              as="li"
              key={service.title}
              delay={i * 70}
              className="group border-b border-white/15"
            >
              {/* fixed label column so every title starts on the same warp line */}
              <div className="grid grid-cols-1 items-baseline gap-4 py-9 transition-[padding] duration-300 md:grid-cols-[6rem_1fr_minmax(0,24rem)] md:gap-10 md:group-hover:pl-4">
                <span className="label text-[#f8e71c]/70">
                  {service.thread}
                </span>

                <h3 className="heading text-[clamp(1.9rem,4vw,3rem)] text-white transition-colors duration-300 group-hover:text-[#f8e71c]">
                  {service.title}
                </h3>

                <p className="leading-relaxed text-white/65">{service.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
