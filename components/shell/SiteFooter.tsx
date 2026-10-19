import Link from "next/link";

import styles from "./SiteFooter.module.css";

const serviceLinks = [
  { label: "Custom Software", href: "/services/custom-software-development/" },
  { label: "Web Applications", href: "/services/web-application-development/" },
  { label: "Mobile Applications", href: "/services/mobile-app-development/" },
  { label: "AI & Automation", href: "/services/ai-workflow-automation/" },
];

const companyLinks = [
  { label: "Work", href: "/work/" },
  { label: "Process", href: "/process/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.statement}>
          <p className={styles.eyebrow}>Imadi Innovations</p>
          <p>Software built around the way your operation needs to work.</p>
          <a href="mailto:hello@imadi-innovations.com">
            hello@imadi-innovations.com
          </a>
        </div>

        <nav aria-label="Services">
          <p>Services</p>
          {serviceLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Company">
          <p>Company</p>
          {companyLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.legal}>
        <span>Imadi Innovations</span>
        <div>
          <Link href="/privacy-policy/">Privacy</Link>
          <Link href="/terms-of-service/">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
