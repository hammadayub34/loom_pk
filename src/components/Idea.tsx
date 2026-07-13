import Reveal from "./Reveal";
import { PILLARS } from "@/lib/content";

export default function Idea() {
  return (
    <section id="idea" className="bg-white py-28 text-[#2c1053] md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal>
          <p className="label text-[#743ac8]">
            The idea
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h2 className="heading text-[clamp(2.5rem,5.6vw,4.4rem)] text-[#2c1053]">
              On its own, a single thread{" "}
              <span className="text-[#743ac8]">frays and snaps</span>.
            </h2>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-end">
            <p className="text-xl leading-relaxed text-[#2c1053]/75">
              Woven with others, over and under and over, it holds weight, holds
              colour, holds together. That is the whole idea behind the name.
            </p>
            <p className="mt-6 text-xl leading-relaxed text-[#2c1053]/75">
              LOOM weaves the separate threads of a brand into something that
              holds. Not louder for a week. Structurally stronger, so growth and
              connection last.
            </p>
          </Reveal>
        </div>

        {/* Pillars: four principles held in tension, not a sequence, so no step
            numbers. The name carries the structure. */}
        <div className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#2c1053]/12 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.name}
              delay={i * 90}
              className="group relative flex flex-col bg-white p-8 transition-colors duration-300 hover:bg-[#4c1b8f]"
            >
              <span className="heading text-3xl text-[#4c1b8f] transition-colors duration-300 group-hover:text-[#f8e71c]">
                {pillar.name}
              </span>
              <span className="label mt-3 text-[#2c1053]/50 transition-colors duration-300 group-hover:text-white/60">
                {pillar.principle}
              </span>
              <p className="mt-5 leading-relaxed text-[#2c1053]/75 transition-colors duration-300 group-hover:text-white/85">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
