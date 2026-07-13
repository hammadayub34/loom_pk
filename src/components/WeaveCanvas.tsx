"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * The Weave, LOOM's signature graphic, running live.
 *
 * Violet warp (vertical) held by yellow weft (horizontal), crossing over and
 * under in a plain weave. Threads enter loose and frayed, then pull taut into
 * fabric: the brand idea, literally. The cursor drags the cloth as it passes.
 */

const WARP = "#743ac8";
const WARP_DIM = "#4c1b8f";
const WEFT = "#ffffff";
const WEFT_SPARK = "#f8e71c";
const GROUND = "#2c1053"; // separates a thread from the one it passes over

// Wide enough that each crossing is legible, at a tight gauge the over/under
// collapses and the whole thing just reads as graph paper.
const SPACING = 52;
const STEP = 6; // sample resolution along a thread
const SETTLE_MS = 2200;

const REACH = 170; // how far the cursor's drag carries
const DRAG = 26; // how far it pulls a thread

type Thread = { base: number; phase: number; slack: number; spark: boolean; dim: boolean };

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

// Subscribed to, rather than read once at mount: a visitor can flip the OS
// setting while the page is open, and the weave should settle the moment they do.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (onChange: () => void) => {
  const mql = window.matchMedia(REDUCED_MOTION);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const getReducedMotionOnServer = () => false; // no preference to read; the client corrects on mount

export default function WeaveCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionOnServer,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let warp: Thread[] = [];
    let weft: Thread[] = [];
    let crossY = new Float32Array(0); // where each crossing sits, one frame's worth

    let raf = 0;
    let elapsed = 0; // advances only while we're actually drawing
    let last = 0;
    let onScreen = false;

    // The pointer is kept in *client* coords and mapped through a rect we read
    // once per frame. Reading it inside the move handler instead forced a layout
    // on every mouse event, anywhere on the page.
    const pointer = { x: -9999, y: -9999, cx: -9999, cy: -9999, active: false };
    let rectLeft = 0;
    let rectTop = 0;

    // Deterministic pseudo-random so threads differ but never re-shuffle.
    const seeded = (i: number) => {
      const s = Math.sin(i * 127.1) * 43758.5453;
      return s - Math.floor(s);
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      rectLeft = rect.left;
      rectTop = rect.top;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;

      warp = Array.from({ length: cols }, (_, i) => ({
        base: i * SPACING,
        phase: seeded(i) * Math.PI * 2,
        // Loose threads start displaced; the loom pulls them into line.
        slack: (seeded(i + 91) - 0.5) * 190,
        spark: false,
        dim: i % 3 !== 0,
      }));

      weft = Array.from({ length: rows }, (_, j) => ({
        base: j * SPACING,
        phase: seeded(j + 313) * Math.PI * 2,
        slack: (seeded(j + 57) - 0.5) * 190,
        // Yellow is a highlighter, not a wall, one weft thread in five.
        spark: j % 5 === 2,
        dim: false,
      }));

      crossY = new Float32Array(cols * rows);
    };

    /** Where warp thread `t` sits at height y. */
    const warpX = (t: Thread, y: number, tension: number, time: number) => {
      const loose = 1 - tension;
      let x =
        t.base +
        t.slack * loose +
        Math.sin(y * 0.014 + t.phase + time * 0.0006) * (26 * loose + 1.6);

      // Cloth drags toward the pointer, then springs back.
      if (pointer.active) {
        const dx = t.base - pointer.cx;
        const dy = y - pointer.cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < REACH * REACH) {
          const d = Math.sqrt(d2) || 1;
          const pull = (1 - d / REACH) ** 2 * DRAG;
          x += (dx / d) * pull;
        }
      }
      return x;
    };

    /** Where weft thread `t` sits at width x. */
    const weftY = (t: Thread, x: number, tension: number, time: number) => {
      const loose = 1 - tension;
      let y =
        t.base +
        t.slack * loose +
        Math.sin(x * 0.013 + t.phase + time * 0.0005) * (26 * loose + 1.6);

      if (pointer.active) {
        const dx = x - pointer.cx;
        const dy = t.base - pointer.cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < REACH * REACH) {
          const d = Math.sqrt(d2) || 1;
          const pull = (1 - d / REACH) ** 2 * DRAG;
          y += (dy / d) * pull;
        }
      }
      return y;
    };

    // Trace into the current path. Nothing strokes until a whole colour's worth
    // of threads is in: one stroke() for the batch, not one per thread. On a
    // 1080p hero the crossings alone used to cost ~840 stroke calls a frame.
    const traceWarp = (t: Thread, from: number, to: number, tension: number, time: number) => {
      let first = true;
      for (let y = from; y <= to; y += STEP) {
        const x = warpX(t, y, tension, time);
        if (first) {
          ctx.moveTo(x, y);
          first = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
    };

    const traceWeft = (t: Thread, tension: number, time: number) => {
      let first = true;
      for (let x = -SPACING; x <= width + SPACING; x += STEP) {
        const y = weftY(t, x, tension, time);
        if (first) {
          ctx.moveTo(x, y);
          first = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
    };

    const render = (time: number, tension: number) => {
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      // Loose threads are faint; the fabric earns its opacity as it tightens.
      const bodyAlpha = 0.24 + tension * 0.46;

      // 1, warp, full length, one batch per colour
      ctx.lineWidth = 2.2;
      ctx.globalAlpha = bodyAlpha;
      for (const dim of [false, true]) {
        ctx.beginPath();
        for (const t of warp) {
          if (t.dim !== dim) continue;
          traceWarp(t, -SPACING, height + SPACING, tension, time);
        }
        ctx.strokeStyle = dim ? WARP_DIM : WARP;
        ctx.stroke();
      }

      // 2, weft, full length, laid across the warp
      for (const spark of [false, true]) {
        ctx.beginPath();
        for (const t of weft) {
          if (t.spark !== spark) continue;
          traceWeft(t, tension, time);
        }
        ctx.strokeStyle = spark ? WEFT_SPARK : WEFT;
        ctx.globalAlpha = spark ? bodyAlpha : bodyAlpha * 0.42;
        ctx.lineWidth = spark ? 2.4 : 1.8;
        ctx.stroke();
      }

      // 3, plain weave: at every other crossing the warp passes back over the
      // weft. Redrawing a short warp segment there is what sells over/under.
      // A hairline of the ground colour on each side lifts the thread clear of
      // the one it crosses, so the eye reads depth instead of a flat grid.
      //
      // Crossing heights are solved once and cached, then the three passes below
      // (ground, then each warp colour) read them back instead of recomputing.
      const over = SPACING * 0.32;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if ((i + j) % 2 !== 0) continue;
          crossY[i * rows + j] = weftY(weft[j], warp[i].base, tension, time);
        }
      }

      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if ((i + j) % 2 !== 0) continue;
          const y = crossY[i * rows + j];
          traceWarp(warp[i], y - over, y + over, tension, time);
        }
      }
      ctx.globalAlpha = 0.55 * tension;
      ctx.strokeStyle = GROUND;
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.globalAlpha = bodyAlpha;
      ctx.lineWidth = 2.2;
      for (const dim of [false, true]) {
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
          if (warp[i].dim !== dim) continue;
          for (let j = 0; j < rows; j++) {
            if ((i + j) % 2 !== 0) continue;
            const y = crossY[i * rows + j];
            traceWarp(warp[i], y - over, y + over, tension, time);
          }
        }
        ctx.strokeStyle = dim ? WARP_DIM : WARP;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    /**
     * Reduced motion gets the settled cloth, drawn once and left alone.
     *
     * Pinning tension to 1 isn't enough on its own: the sine that gives each
     * thread its life keeps an amplitude floor of 1.6px at full tension, so
     * feeding it a running clock left the whole weave drifting for as long as
     * the page was open. Freezing the clock at 0 keeps the per-thread variation
     * (it becomes a fixed offset) and takes away the movement.
     */
    const drawStill = () => render(0, 1);

    const loop = (now: number) => {
      if (!last) last = now;
      elapsed += now - last;
      last = now;

      const rect = canvas.getBoundingClientRect();
      rectLeft = rect.left;
      rectTop = rect.top;

      pointer.cx += (pointer.x - rectLeft - pointer.cx) * 0.09;
      pointer.cy += (pointer.y - rectTop - pointer.cy) * 0.09;

      render(elapsed, easeOutQuint(Math.min(elapsed / SETTLE_MS, 1)));
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || reduced) return;
      last = 0; // don't bill the pause to the settle animation
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointer.active) {
        pointer.cx = e.clientX - rectLeft;
        pointer.cy = e.clientY - rectTop;
      }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onResize = () => {
      build();
      if (reduced) drawStill();
    };

    // The hero is one screen of a five-section page. Painting it while it's
    // scrolled away is work nobody sees: rAF is only throttled for hidden tabs,
    // not for off-screen elements in a visible one.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (reduced) return;
        if (onScreen) start();
        else stop();
      },
      { rootMargin: "120px" },
    );

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };

    build();

    if (reduced) {
      drawStill();
    } else {
      // Don't wait on the observer's first callback to put something on screen;
      // if the hero turns out to be scrolled away, it will stop us right back.
      start();
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
