const PHRASES = [
  "Weave it stronger",
  "Your brand, wide awake",
  "Loose threads? Let's make fabric",
  "Growth you can actually feel",
];

export default function Marquee() {
  return (
    <section
      aria-label="How we sound"
      className="overflow-hidden border-y border-white/10 bg-[#4c1b8f] py-5"
    >
      {/* Two identical runs, so sliding exactly one of them off (-50%) loops
          seamlessly. Only the first is announced: the copy exists to fill the
          track, and a screen reader shouldn't hear every phrase twice. */}
      <div className="marquee-track motion-reduce:[animation:none]">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0">
            {PHRASES.map((phrase) => (
              <span
                key={phrase}
                className="heading flex shrink-0 items-center gap-8 px-8 text-2xl whitespace-nowrap text-white/90 md:text-3xl"
              >
                {phrase}
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rotate-45 bg-[#f8e71c]"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
