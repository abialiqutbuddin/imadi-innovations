import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Glyph } from "@/components/visuals/Glyph";

import styles from "./ProductsPage.module.css";

export const metadata: Metadata = {
  title: "Products | Imadi Innovations",
  description:
    "Explore products developed by Imadi Innovations, including the Tijarat POS beta for Pakistani business operations.",
  alternates: { canonical: "/products/" },
};

const capabilities = [
  "Billing & invoicing",
  "Inventory & purchasing",
  "Customer & supplier balances",
  "Operational reporting",
] as const;

const publishingRules = [
  ["Status", "State whether the product is a concept, prototype, beta, or live product."],
  ["Available", "Show only capabilities supported by the approved product evidence."],
  ["Planned", "Keep future capability separate and unpublished until its public wording is approved."],
] as const;

export default function ProductsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> Product registry</p>
            <h1>Focused products for a specific operating environment.</h1>
            <p>
              Product work is kept separate from client services so its status,
              audience, available capability, and next step remain clear.
            </p>
            <a href="#product-registry">Open the registry <span aria-hidden="true">↓</span></a>
          </div>
          <figure className={styles.heroProduct}>
            <div className={styles.windowHeader} aria-hidden="true"><span><i /><i /><i /></span><b>Actual beta interface</b><em>Product 01</em></div>
            <div className={styles.heroMedia}>
              <Image
                alt="Tijarat POS dashboard showing sales, credit, payments, and product summaries"
                fill
                priority
                sizes="(max-width: 68rem) 92vw, 48vw"
                src="/tijarat/tijarat-dashboard.jpeg"
              />
            </div>
            <figcaption><span>Tijarat POS</span><b>Beta / Pakistan-focused operations</b></figcaption>
          </figure>
        </div>
      </header>

      <section className={styles.registry} id="product-registry" aria-labelledby="registry-title">
        <div className={styles.inner}>
          <div className={styles.registryHeader}>
            <p className={styles.eyebrow}>Current product / 01</p>
            <div className={styles.productIdentity}>
              <Image alt="" height={72} src="/tijarat/tijarat-logo.png" width={72} />
              <div><h2 id="registry-title">Tijarat POS</h2><p>A beta product by Imadi Innovations</p></div>
            </div>
            <Link href="/tijarat/">Explore the product <span aria-hidden="true">↗</span></Link>
          </div>

          <div className={styles.productRecord}>
            <div className={styles.recordNarrative}>
              <p className={styles.recordLabel}>Operating problem</p>
              <h3>Daily commerce records become difficult to trust when selling, stock, purchasing, credit, and reporting live in separate places.</h3>
              <p>
                Tijarat POS connects those responsibilities in one offline-capable system
                for Pakistani retail and wholesale operations.
              </p>
              <dl>
                <div><dt>Public status</dt><dd>Beta</dd></div>
                <div><dt>Designed for</dt><dd>Pakistani retail and wholesale teams</dd></div>
                <div><dt>Product format</dt><dd>Desktop and mobile clients</dd></div>
              </dl>
            </div>

            <figure className={styles.productScreen}>
              <div><Image alt="Tijarat POS invoicing workspace" fill sizes="(max-width: 60rem) 100vw, 50vw" src="/tijarat/tijarat-invoicing.png" /></div>
              <figcaption><span>Actual product interface</span><b>Invoice creation with stock, payment, and balance context</b></figcaption>
            </figure>
          </div>

          <div className={styles.capabilityRow} aria-labelledby="capabilities-title">
            <p className={styles.eyebrow} id="capabilities-title">Available in beta</p>
            <ul>{capabilities.map((capability) => <li key={capability}><Glyph name="check" /><span>{capability}</span></li>)}</ul>
          </div>
        </div>
      </section>

      <section className={styles.boundary} aria-labelledby="boundary-title">
        <div className={styles.inner}>
          <div className={styles.boundaryIntro}>
            <p className={styles.eyebrow}>Product publishing boundary</p>
            <h2 id="boundary-title">Status before roadmap theatre.</h2>
            <p>The registry distinguishes what exists now from what may be discussed later.</p>
          </div>
          <div className={styles.ruleList}>
            {publishingRules.map(([title, detail], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.future} aria-labelledby="future-title">
        <div className={styles.inner}>
          <div className={styles.futureIntro}><p className={styles.eyebrow}>Future registry</p><h2 id="future-title">No second product is publicly listed.</h2></div>
          <div className={styles.emptyState}>
            <Glyph name="products" />
            <div><h3>The next entry must earn its place.</h3><p>A future product will appear only after its name, status, audience, available capabilities, imagery, and product owner approve the public record.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="products-cta-title">
        <div className={styles.ctaInner}>
          <div><p className={styles.darkEyebrow}>Current product</p><h2 id="products-cta-title">See how Tijarat POS connects daily commerce work.</h2></div>
          <Link href="/tijarat/">Explore Tijarat POS <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
