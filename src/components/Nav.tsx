"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import SocialLinks from "./SocialLinks";

const LINKS = [
  { href: "#idea", label: "The idea" },
  { href: "#work", label: "What we do" },
  { href: "#clients", label: "Clients" },
  { href: "#packages", label: "Packages" },
  { href: "#contact", label: "Contact" },
];

const MENU_ID = "site-menu";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The panel and its toggle are both `md:hidden`. Crossing the breakpoint with
  // the menu open (a phone rotating to landscape clears 768px on its own) used
  // to hide every control while `open` stayed true, stranding the page under a
  // `overflow: hidden` no visible button could lift. Close it at the breakpoint.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    // Only the crossing matters: the menu always mounts closed, so there is no
    // initial state to reconcile here.
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Escape closes, and Tab cycles inside the open panel instead of walking off
  // into page content the visitor can't even scroll to.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      // The toggle sits outside the panel but is part of the menu, so it anchors
      // the loop: shift-tabbing off the first link lands back on it.
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        buttonRef.current?.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        buttonRef.current?.focus();
      } else if (e.shiftKey && active === buttonRef.current) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === buttonRef.current) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        open
          ? "border-b border-white/10 bg-[#2c1053]" // solid: the panel must not let the page read through
          : stuck
            ? "border-b border-white/10 bg-[#2c1053]/85 backdrop-blur-md"
            : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" aria-label="LOOM, home" className="block">
          <Image
            src="/brand/loom_mark.png"
            alt=""
            width={2083}
            height={1158}
            priority
            className="h-9 w-auto md:h-10"
          />
        </a>

        {/* five items now, so the gap tightens a notch before it grows again */}
        <ul className="hidden items-center gap-7 md:flex lg:gap-9">
          {LINKS.map((link) => (
            <li key={link.href}>
              {/* padded so the tap target clears 40px, not just the text height */}
              <a
                href={link.href}
                className="label block py-3 whitespace-nowrap text-white/65 transition-colors hover:text-[#f8e71c]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SocialLinks className="hidden sm:flex" />

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg border border-white/15 md:hidden"
          >
            <span
              className={`block h-[2px] w-5 bg-white transition-transform duration-200 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-white transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-white transition-transform duration-200 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div ref={panelRef} id={MENU_ID} className="border-t border-white/10 md:hidden">
          <ul className="mx-auto flex max-w-[1240px] flex-col px-6 py-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="heading block border-b border-white/10 py-4 text-2xl text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-6">
              <SocialLinks className="justify-start" />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
