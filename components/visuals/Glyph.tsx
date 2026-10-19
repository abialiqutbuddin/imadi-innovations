import {
  BadgeCheck,
  Blocks,
  Bot,
  Building2,
  CheckCheck,
  ClipboardCheck,
  CloudCog,
  CodeXml,
  Compass,
  FileCheck2,
  GitBranch,
  HeartPulse,
  Layers3,
  Lightbulb,
  Link2,
  ListChecks,
  Network,
  PackageCheck,
  PanelsTopLeft,
  RefreshCw,
  Rocket,
  Route,
  ScanSearch,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  UserRoundCheck,
  UsersRound,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type GlyphName =
  | "about"
  | "ai"
  | "build"
  | "check"
  | "commerce"
  | "community"
  | "connect"
  | "custom"
  | "define"
  | "deliver"
  | "discover"
  | "evidence"
  | "healthcare"
  | "hospitality"
  | "integrations"
  | "mobile"
  | "mvp"
  | "outcome"
  | "plan"
  | "products"
  | "service"
  | "support"
  | "system"
  | "validate"
  | "web"
  | "workforce"
  | "workflow";

const glyphs: Record<GlyphName, LucideIcon> = {
  about: Compass,
  ai: Bot,
  build: CodeXml,
  check: CheckCheck,
  commerce: Truck,
  community: UsersRound,
  connect: Link2,
  custom: Workflow,
  define: ListChecks,
  deliver: PackageCheck,
  discover: ScanSearch,
  evidence: FileCheck2,
  healthcare: HeartPulse,
  hospitality: Store,
  integrations: CloudCog,
  mobile: Smartphone,
  mvp: Rocket,
  outcome: BadgeCheck,
  plan: Route,
  products: ShoppingBag,
  service: Building2,
  support: Wrench,
  system: Blocks,
  validate: ShieldCheck,
  web: PanelsTopLeft,
  workforce: UserRoundCheck,
  workflow: GitBranch,
};

const serviceGlyphs: Record<string, GlyphName> = {
  "custom-software-development": "custom",
  "web-application-development": "web",
  "mobile-app-development": "mobile",
  "mvp-saas-development": "mvp",
  "ai-workflow-automation": "ai",
  "integrations-modernization-support": "integrations",
};

export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  const Icon = glyphs[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.7} />;
}

export function ServiceGlyph({ slug, className }: { slug: string; className?: string }) {
  return <Glyph className={className} name={serviceGlyphs[slug] ?? "system"} />;
}

export const visualSequences: Record<string, [GlyphName, GlyphName, GlyphName]> = {
  services: ["discover", "system", "deliver"],
  work: ["workflow", "evidence", "outcome"],
  industries: ["service", "workflow", "connect"],
  process: ["discover", "build", "validate"],
  about: ["about", "workflow", "check"],
  products: ["products", "system", "support"],
  service: ["workflow", "build", "deliver"],
};

export const decorativeGlyphs = { Layers3, ClipboardCheck, Lightbulb, Network, RefreshCw, Search, Sparkles };
