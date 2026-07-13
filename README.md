# LOOM landing page

Marketing site for LOOM. Built from `loom-brand-identity.md`; every colour, typeface
and piece of copy traces back to that guide.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## What's here

| Path | What it is |
|---|---|
| `src/app/globals.css` | Design tokens, palette, type roles, the weave texture, grain |
| `src/app/layout.tsx` | Fonts (Bricolage Grotesque / DM Sans / DM Mono), metadata |
| `src/lib/content.ts` | All copy: services, pillars, packages, contact details |
| `src/components/WeaveCanvas.tsx` | The signature: a live loom behind the hero |
| `src/components/LogoVideo.tsx` | The animated wordmark, violet ground keyed out |
| `scripts/cut-logo.mjs` | Regenerates the transparent logo, `npm run cut:logo` |

**To change prices, packages, or contact details, edit `src/lib/content.ts`.** Nothing
else needs touching, the pricing cards and contact block render from it.

## The design

The hero is a working loom. Violet warp threads and yellow weft threads start loose and
frayed, then pull taut into fabric over the first two seconds, crossing over and under in
a plain weave. The cursor drags the cloth as it passes. That's the brand's own idea:
loose threads become one strong fabric, rather than a decorative backdrop.

Everything else stays quiet so the weave is the thing you remember. Colour holds the
guide's 60/30/10 ratio: violet and midnight carry the layout, white gives the breathing
room, and Voltage Yellow only ever points, headline accents, calls to action, one weft
thread in five. It never fills a section.

## The logo, with its background removed

Both source assets ship the white wordmark on a violet tile. Neither is used raw:

- **The still logo** is keyed once at build-time by `scripts/cut-logo.mjs` (sharp) into
  `public/brand/loom_mark.png`, a trimmed, transparent wordmark, used in the nav and
  footer. Re-run it with `npm run cut:logo` if the source art changes.
- **The animation** is keyed once by `scripts/cut-animation.mjs` (`npm run cut:animation`)
  into `public/brand/loom_logo_animation.webp`: an animated WebP with a real alpha
  channel, which the browser decodes and loops by itself. No JavaScript on the page, and
  57 KB against the mp4's 694 KB. `loom_mark_still.png` is the settled frame at identical
  dimensions, handed to reduced-motion visitors via `<picture>`.

Both key on the same measured threshold: no background pixel in the source exceeds a
min-channel of ~95, and every wordmark pixel sits at 240+, so the cut is clean with no
violet fringing.

Three things in that script exist because of bugs that actually happened, so don't
"simplify" them away:

- **The WebP is lossless.** Lossy WebP nudges the antialiased alpha edge differently on
  each frame, and on a flat two-colour mark that reads as the outline shimmering.
  Lossless is also *smaller* here, because the artwork is so flat.
- **Speckles are stripped.** The mp4 is lossy, so a scatter of violet pixels squeaks past
  the key threshold: isolated, faint, different every frame, which flickers around the
  mark. Only alpha connected to a solid core survives.
- **The crop is measured, not guessed, and the opening fly-in is skipped.** Two swooshes
  enter from beyond the edge of the source frame in the first half-second, already
  truncated in the mp4. Including them dragged the crop box out to the full frame and
  stranded the mark in dead space. The loop starts at frame 15; the box is then the true
  bounds of the ink across every remaining frame, so nothing clips and no space is wasted.

The mark carries **no drop-shadow**: the brand guide forbids one, and filtering a
per-frame alpha against the animating weave behind it made the edge shimmer.

## The mascot, with its background removed

`scripts/cut-mascot.mjs` (`npm run cut:mascot`) writes `public/brand/loom_mascot_cut.png`,
and he's placed raw on the violet. He needs a different technique from the logo:

- He can't be keyed on brightness, because his shirt and shoes are white too. That would
  punch holes straight through him.
- A flood fill inward from the border isn't enough either. The gaps between his legs and
  inside his bent arm are background, but they're sealed off from the edge by his body,
  so a fill from outside never reaches them and they render as white patches.

So near-white pixels are grouped into connected regions, and a region is dropped if it
touches the border **or** is essentially pure white. The measured split is clean: the
ground and the enclosed gaps average ~254, while the shirt sits at ~236 and never becomes
a candidate at all.

Note the mascot source is only 154x364, so it's close to 1x at the size it's displayed.
A higher-resolution original would sharpen it up; nothing in the code needs to change.

## One deliberate departure from the guide

**The brand pillars aren't numbered.** The guide lists them 01 to 04, but they're four
principles held in tension, not a sequence, and numbering would imply an order the reader
doesn't need. The pillar name carries the structure instead.

## Before it goes live

- `metadataBase` in `src/app/layout.tsx` is set to `https://loom.pk`, update if the
  domain differs.
- The LinkedIn URL is a best guess (`linkedin.com/company/loom-pk`); confirm the real one
  in `src/lib/content.ts`.
- No email address is published anywhere. The guide flagged `hello@loom.ots` as an
  unconfirmed placeholder, so it was left out, WhatsApp and phone are the contact paths.
