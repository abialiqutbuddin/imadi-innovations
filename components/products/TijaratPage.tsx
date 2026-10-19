import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BadgeCheck, ShieldCheck, WifiOff } from "lucide-react";

import { Glyph, type GlyphName } from "@/components/visuals/Glyph";

import { TijaratInterestForm } from "./TijaratInterestForm";
import styles from "./TijaratPage.module.css";

const capabilities: Array<{ icon: GlyphName; label: string; title: string; body: string }> = [
  {
    icon: "commerce",
    label: "Sales",
    title: "Billing and invoicing",
    body: "Create invoices, add products and payments, apply discounts or charges, and keep customer history visible while billing.",
  },
  {
    icon: "products",
    label: "Stock",
    title: "Inventory and purchasing",
    body: "Manage products, units, stores, warehouses, suppliers, purchasing, stock movement, and low-stock visibility.",
  },
  {
    icon: "connect",
    label: "Accounts",
    title: "Customer and supplier balances",
    body: "Keep credit sales, collections, receivables, supplier balances, and transaction history connected to daily work.",
  },
  {
    icon: "evidence",
    label: "Decisions",
    title: "Reports and operational overview",
    body: "Review sales, product performance, stock, receivables, payables, payment mix, and other operational signals.",
  },
];

const productFoundations = [
  {
    title: "Works through connectivity changes",
    body: "The desktop application supports offline-capable daily work and synchronizes with the cloud when connectivity is available.",
    icon: <WifiOff aria-hidden="true" />,
  },
  {
    title: "Different views for different roles",
    body: "Company, store, device, and role context keep operational access aligned with the person doing the work.",
    icon: <Glyph name="workforce" />,
  },
  {
    title: "Built for retail and wholesale workflows",
    body: "Tijarat POS brings billing, inventory, purchasing, credit, accounting context, and reporting into one product.",
    icon: <Glyph name="system" />,
  },
];

export function TijaratPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.productMark}>
              <Image alt="Tijarat POS" height={58} src="/tijarat/tijarat-logo.png" width={58} />
              <span><b>Tijarat POS</b><small>A product by Imadi Innovations</small></span>
            </div>
            <p className={styles.eyebrow}>Business operations software / beta</p>
            <h1>Sell, stock, and stay on top of the business.</h1>
            <p className={styles.lead}>
              Tijarat POS connects billing, inventory, purchasing, customer and supplier
              balances, and reporting in one offline-capable system for Pakistani businesses.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#request-demo">
                Request a Demo <ArrowDown aria-hidden="true" />
              </a>
              <a className={styles.textLink} href="#product-view">
                See the Product <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.productWindow} role="img" aria-label="Tijarat POS dashboard preview">
            <div className={styles.windowHeader}>
              <span><i /><i /><i /></span>
              <b>Live product interface</b>
              <em><BadgeCheck aria-hidden="true" /> Beta</em>
            </div>
            <div className={styles.windowMedia}>
              <Image
                alt="Tijarat POS dashboard showing sales, credit, payment, and product summaries"
                fill
                priority
                sizes="(max-width: 68rem) 92vw, 48vw"
                src="/tijarat/tijarat-dashboard.jpeg"
              />
            </div>
            <dl className={styles.statusMeta}>
              <div><dt>Designed for</dt><dd>Retail and wholesale operations</dd></div>
              <div><dt>Product format</dt><dd>Desktop and mobile clients</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="capabilities-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Connected daily work</p><h2 id="capabilities-title">The core operation in one system.</h2></div>
            <p>Tijarat POS is organized around the records and decisions a business returns to every day—not a collection of disconnected tools.</p>
          </div>
          <div className={styles.cardGrid}>
            {capabilities.map((capability) => (
              <article key={capability.title}>
                <div className={styles.cardTop}><Glyph name={capability.icon} /><span>Available in beta</span></div>
                <p className={styles.cardLabel}>{capability.label}</p>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.productView} id="product-view" aria-labelledby="product-view-title">
        <div className={styles.productViewInner}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Inside Tijarat POS</p><h2 id="product-view-title">Billing with the surrounding context visible.</h2></div>
            <p>The invoicing workspace keeps item availability, customer history, payment entry, totals, and balance due in the same working view.</p>
          </div>
          <div className={styles.mediaShowcase}>
            <figure className={styles.interfaceFigure}>
              <div><Image alt="Tijarat POS invoicing workspace" fill sizes="(max-width: 52rem) 100vw, 72vw" src="/tijarat/tijarat-invoicing.png" /></div>
              <figcaption><span>Actual product interface</span><b>Invoice creation and payment context</b></figcaption>
            </figure>
            <figure className={styles.launchFigure}>
              <Image alt="Tijarat POS retail and wholesale product overview" fill sizes="(max-width: 52rem) 75vw, 22vw" src="/tijarat/tijarat-pos-launch.png" />
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.statusSection} aria-labelledby="status-title">
        <div className={styles.statusInner}>
          <div className={styles.statusIntro}>
            <div>
              <p className={styles.eyebrow}>Available and planned</p>
              <h2 id="status-title">Beta capability is public. Future capability is not implied.</h2>
            </div>
            <p>The product record separates what is currently supported by approved evidence from any later roadmap discussion.</p>
          </div>
          <div className={styles.statusColumns}>
            <article>
              <p className={styles.cardLabel}>Available in beta</p>
              <Glyph name="check" />
              <h3>Current capability</h3>
              <p>Billing, inventory, purchasing, balances, reporting, role context, and offline-capable operation are represented in the current product record.</p>
            </article>
            <article className={styles.unpublishedState}>
              <p className={styles.cardLabel}>Planned capability</p>
              <Glyph name="evidence" />
              <h3>No public roadmap item is approved.</h3>
              <p>Future features will be listed only after their status and wording are approved. No launch date or capability is being implied here.</p>
            </article>
            <article className={styles.unpublishedState}>
              <p className={styles.cardLabel}>Early-access terms</p>
              <Glyph name="support" />
              <h3>No public benefit or pricing commitment is published.</h3>
              <p>The demo request is a product-fit conversation, not a promise of founder pricing, access timing, or commercial terms.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`} aria-labelledby="foundations-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Product foundations</p><h2 id="foundations-title">Made for the conditions around the counter.</h2></div>
            <p>Daily operations need dependable access, clear responsibility, and connected records even when the working environment is imperfect.</p>
          </div>
          <div className={styles.foundationGrid}>
            {productFoundations.map((item) => (
              <article key={item.title}>
                {item.icon}
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.fitSection} aria-labelledby="fit-title">
        <div className={styles.fitInner}>
          <div>
            <p className={styles.eyebrow}>Business fit</p>
            <h2 id="fit-title">For teams ready to replace fragmented records.</h2>
          </div>
          <div className={styles.fitColumns}>
            <article>
              <Glyph name="check" />
              <h3>A useful fit</h3>
              <p>Your business manages sales, stock, purchasing, customer credit, or supplier balances through paper, spreadsheets, messages, or separate applications.</p>
            </article>
            <article>
              <Glyph name="validate" />
              <h3>Not the right fit</h3>
              <p>The public product record does not establish fit for businesses that require an unlisted capability, guaranteed migration, or a committed rollout date.</p>
            </article>
            <article>
              <Glyph name="support" />
              <h3>Start with the workflow</h3>
              <p>A demo begins with how the business currently sells, stores, purchases, and follows balances so product fit can be assessed clearly.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.faqInner}>
          <div className={styles.faqIntro}>
            <p className={styles.eyebrow}>Tijarat FAQ</p>
            <h2 id="faq-title">What the current product record can answer.</h2>
          </div>
          <div className={styles.faqList}>
            <details><summary>What is Tijarat POS’s current status?<span aria-hidden="true">+</span></summary><p>Tijarat POS is presented publicly as a beta product. The page does not claim a general-availability date or production scale.</p></details>
            <details><summary>Does daily work require continuous internet access?<span aria-hidden="true">+</span></summary><p>The desktop application supports offline-capable daily work and synchronizes with the cloud when connectivity is available. Exact fit still depends on the operating environment.</p></details>
            <details><summary>Are pricing and rollout dates published?<span aria-hidden="true">+</span></summary><p>No. The current public path begins with a product-fit review. Pricing, access, and rollout commitments are not stated on this site.</p></details>
          </div>
        </div>
      </section>

      <section className={styles.formSection} id="request-demo" aria-labelledby="demo-title">
        <div className={styles.formInner}>
          <div className={styles.formIntro}>
            <p className={styles.eyebrow}>Request a Tijarat demo</p>
            <h2 id="demo-title">Show Imadi Innovations how your business operates.</h2>
            <p>Share the current sales, stock, purchasing, or balance workflow. The team will review the context and follow up about product fit.</p>
            <div className={styles.privacyNote}>
              <ShieldCheck aria-hidden="true" />
              <p>Your submission is reviewed privately and used only to assess Tijarat POS fit and respond.</p>
            </div>
          </div>
          <TijaratInterestForm />
        </div>
      </section>

      <nav className={styles.productExit} aria-label="Continue from Tijarat POS">
        <div>
          <p>A product by Imadi Innovations</p>
          <span>Return to the product registry or explore client-service delivery.</span>
        </div>
        <Link href="/products/">All products <span aria-hidden="true">←</span></Link>
        <Link href="/services/">Imadi Innovations services <span aria-hidden="true">↗</span></Link>
      </nav>
    </div>
  );
}
