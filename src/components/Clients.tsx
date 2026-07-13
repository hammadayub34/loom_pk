import Image from "next/image";
import Reveal from "./Reveal";
import { CLIENTS } from "@/lib/clients";
import { CONTACT } from "@/lib/content";

const enquiry = `${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hi LOOM, I'd like to talk about weaving my brand in. Could we start a conversation?",
)}`;

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
              A brand arrives as loose thread and leaves as fabric. These are the
              ones on the loom right now.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTS.map((client, i) => (
            <Reveal
              key={client.name}
              delay={i * 110}
              className="group overflow-hidden rounded-3xl border border-[#2c1053]/12 transition-colors duration-300 hover:border-[#743ac8]"
            >
              {/* Each mark sits on the ground it was drawn for. A white plate
                  beside an ink one is deliberate: Oresto's plate is white
                  line-art and vanishes on light, UKS carries a JPEG halo on
                  anything but white, and repainting a client's logo to match
                  ours isn't a call we get to make. */}
              <div
                className={`flex aspect-[5/4] items-center justify-center border-b border-[#2c1053]/10 p-10 ${
                  client.ground === "light" ? "bg-white" : "bg-[#0b0505]"
                }`}
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={client.width}
                  height={client.height}
                  className="max-h-full w-auto max-w-[78%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-7">
                <h3 className="heading text-2xl text-[#2c1053] transition-colors duration-300 group-hover:text-[#743ac8]">
                  {client.name}
                </h3>
                <p className="label mt-2.5 text-[#2c1053]/45">{client.sector}</p>

                {client.work && (
                  <p className="mt-4 leading-relaxed text-[#2c1053]/70">
                    {client.work}
                  </p>
                )}
                {client.result && (
                  <p className="label mt-3 text-[#743ac8]">{client.result}</p>
                )}
              </div>
            </Reveal>
          ))}

          {/* The empty heddle. A short roster reads as honest when the gap is
              offered rather than padded out, and this slot converts. */}
          <Reveal delay={CLIENTS.length * 110} className="flex">
            <a
              href={enquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-[#2c1053]/25 p-10 text-center transition-colors duration-300 hover:border-[#743ac8] hover:bg-[#743ac8]/[0.04]"
            >
              <span
                aria-hidden
                className="heading text-5xl text-[#2c1053]/20 transition-colors duration-300 group-hover:text-[#743ac8]"
              >
                +
              </span>
              <span className="heading mt-5 text-2xl text-[#2c1053] transition-colors duration-300 group-hover:text-[#743ac8]">
                Your brand next.
              </span>
              <span className="label mt-3 text-[#2c1053]/45">
                Start a conversation
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
