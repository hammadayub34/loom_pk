import Image from "next/image";
import Reveal from "./Reveal";
import { CLIENTS } from "@/lib/clients";

export default function Clients() {
  return (
    <section id="clients" className="bg-white py-28 text-[#2c1053] md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label text-[#743ac8]">Our clients</p>
            <h2 className="heading mt-6 max-w-xl text-[clamp(2.5rem,5.6vw,4.4rem)] text-[#2c1053]">
              Threads we&rsquo;ve{" "}
              <span className="text-[#743ac8]">woven in</span>.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-sm text-lg leading-relaxed text-[#2c1053]/70">
              A brand arrives as loose thread and leaves as fabric.{" "}
              <span className="text-[#2c1053]">{CLIENTS.length} of them</span>{" "}
              are on the loom.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {CLIENTS.map((client, i) => (
            <Reveal
              key={client.name}
              // capped, or the last tile of twenty-four would arrive two seconds late
              delay={Math.min(i, 7) * 60}
              className="group"
            >
              {/* The tile is painted the ground its mark was drawn for, so the
                  logo sits in it seamlessly and we own the padding rather than
                  inheriting whatever whitespace the source file came with. */}
              <div
                style={{ backgroundColor: client.ground }}
                className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-[#2c1053]/10 transition-colors duration-300 group-hover:border-[#743ac8]"
              >
                {client.fill ? (
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={client.width}
                    height={client.height}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={client.width}
                    height={client.height}
                    className="max-h-[72%] w-auto max-w-[76%] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                )}
              </div>

              <p className="label mt-3.5 text-center text-[11px] leading-snug text-[#2c1053]/50 transition-colors duration-300 group-hover:text-[#743ac8]">
                {client.name}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
