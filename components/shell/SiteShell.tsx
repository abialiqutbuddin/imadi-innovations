import type { ReactNode } from "react";

import { AttributionCapture } from "@/components/contact/AttributionCapture";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

function ShellFrame({ children, beforeHeader }: { children: ReactNode; beforeHeader?: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {beforeHeader}
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </>
  );
}

export function MarketingShell({ children }: { children: ReactNode }) {
  return <ShellFrame beforeHeader={<AttributionCapture />}>{children}</ShellFrame>;
}

export function UtilityShell({ children }: { children: ReactNode }) {
  return <ShellFrame>{children}</ShellFrame>;
}
