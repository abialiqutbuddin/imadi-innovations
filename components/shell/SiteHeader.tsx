"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import styles from "./SiteHeader.module.css";

const navigation = [
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "Industries", href: "/industries/" },
  { label: "Process", href: "/process/" },
  { label: "About", href: "/about/" },
  { label: "Products", href: "/products/" },
];

function pathIsActive(pathname: string, href: string) {
  return pathname === href.slice(0, -1) || pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const panel = panelRef.current;
    const firstLink = panel?.querySelector<HTMLElement>("a[href]");
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>("footer");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    firstLink?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const panelControls = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const focusable = toggleRef.current
        ? [toggleRef.current, ...panelControls]
        : panelControls;
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="Imadi Innovations home">
          <span className={styles.brandLogo}>
            <Image
              src="/logo.jpg"
              alt=""
              width={44}
              height={44}
              priority
            />
          </span>
          <span className={styles.brandText} translate="no">
            <strong>Imadi Innovations</strong>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathIsActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className={styles.desktopCta} href="/contact/">
          Discuss Your Workflow
        </Link>

        <button
          ref={toggleRef}
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "≡"}</span>
        </button>
      </div>

      <div
        ref={panelRef}
        id="mobile-navigation"
        className={styles.mobilePanel}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathIsActive(pathname, item.href) ? "page" : undefined}
              onClick={closeMenu}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <Link className={styles.mobileCta} href="/contact/" onClick={closeMenu}>
          Discuss Your Workflow
        </Link>
      </div>
    </header>
  );
}
