import WeaveCanvas from "./WeaveCanvas";
import { CONTACT, DISCIPLINES } from "@/lib/content";

export default function Hero() {
  // Stacked, the column is top-aligned under the nav with a measured gap.
  // Centring a short column inside 100svh is what pushed the mark so far down:
  // the leftover height gets split above and below it. Side by side, there's no
  // leftover to speak of, so it goes back to centred.
  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-start overflow-hidden bg-[#2c1053] pt-28 pb-16 md:justify-center"
    >
      {/* The loom itself: threads pull taut behind the message */}
      <WeaveCanvas className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      {/* Depth: a violet glow so the fabric falls off toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(116,58,200,0.5)_0%,rgba(44,16,83,0.75)_55%,#2c1053_100%)]"
      />

      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-9 px-6 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:px-10">
        {/* Stacked, the mark leads and the copy follows; side by side, the copy
            leads and the mark sits to its right. Same two nodes, reordered. */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="label text-[#f8e71c] opacity-0 [animation:fade-up_.7s_cubic-bezier(.16,1,.3,1)_.15s_forwards]">
            Gujranwala · Est. 2026
          </p>

          <h1 className="display mt-5 text-[clamp(5rem,12vw,7.6rem)] text-white md:mt-6">
            <span className="block opacity-0 [animation:fade-up_.9s_cubic-bezier(.16,1,.3,1)_.28s_forwards]">
              Own the
            </span>
            <span className="block opacity-0 [animation:fade-up_.9s_cubic-bezier(.16,1,.3,1)_.42s_forwards]">
              <span className="relative inline-block text-[#f8e71c]">
                spotlight
                {/* a single weft thread, drawn under the word it holds */}
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full"
                >
                  <path
                    d="M0 8 C 40 2, 70 12, 110 6 S 190 1, 230 8 S 285 4, 300 6"
                    fill="none"
                    stroke="#f8e71c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="[stroke-dasharray:320] [stroke-dashoffset:320] [animation:draw_1.1s_cubic-bezier(.16,1,.3,1)_1.05s_forwards] motion-reduce:[stroke-dashoffset:0]"
                  />
                </svg>
              </span>
              <span className="text-white">.</span>
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-white/70 opacity-0 [animation:fade-up_.9s_cubic-bezier(.16,1,.3,1)_.6s_forwards] md:mt-9 md:text-lg lg:mx-0 lg:text-xl">
            A loom takes loose threads and makes one strong fabric. We do that
            with brands: strategy, story, design, events and reach, woven into
            something that holds.
          </p>

          {/* One per row on a phone, shoulder to shoulder once there's width for it */}
          <div className="mt-9 flex flex-col items-center gap-3.5 opacity-0 [animation:fade-up_.9s_cubic-bezier(.16,1,.3,1)_.74s_forwards] sm:flex-row sm:justify-center md:mt-10 md:gap-4 lg:justify-start">
            <a
              href="#packages"
              className="label inline-flex items-center justify-center rounded-full bg-[#f8e71c] px-6 py-4 text-[#2c1053] transition-transform duration-200 hover:-translate-y-0.5 md:px-7"
            >
              See packages
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-4 text-white transition-colors duration-200 hover:border-[#f8e71c] hover:text-[#f8e71c] md:px-7"
            >
              Talk to us
            </a>
          </div>

          <p className="label mt-9 text-white/45 opacity-0 [animation:fade-up_.9s_cubic-bezier(.16,1,.3,1)_.88s_forwards] md:mt-12">
            {DISCIPLINES.join(" · ")}
          </p>
        </div>

        {/* The mark sits straight on the weave: no tile, no backing shape.
            It shows on every width; the signature shouldn't be desktop-only.

            An animated WebP carries its own alpha, so the browser decodes and
            loops it natively. The <source> hands reduced-motion visitors the
            settled frame instead, at identical dimensions so nothing shifts. */}
        <div className="order-1 flex h-full items-center justify-center lg:order-2">
          <picture className="w-full max-w-[175px] opacity-0 [animation:fade-up_1s_cubic-bezier(.16,1,.3,1)_.5s_forwards] sm:max-w-[340px] lg:max-w-[480px]">
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet="/brand/loom_mark_still.png"
            />
            {/* a plain img, not next/image: optimising it would re-encode the
                animation and flatten it to a single frame */}
            <img
              src="/brand/loom_logo_animation.webp"
              alt="The LOOM wordmark, animating"
              width={340}
              height={191}
              fetchPriority="high" // above the fold, and a candidate for LCP
              // no drop-shadow: the guide forbids one on the mark, and filtering
              // a per-frame alpha against the moving weave made the edge shimmer
              className="h-auto w-full"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
