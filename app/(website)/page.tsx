import Slideshow from "@/components/Slideshow";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/types";

async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] {
    title,
    headline,
    description,
    type,
    features,
    techStack,
    desktopImg,
    mobileImg,
    hideDesktop
  }`;

  const projects = await client.fetch(query);

  // Map images to URLs
  return projects.map((p: any) => ({
    ...p,
    desktopImg: p.desktopImg ? urlFor(p.desktopImg).url() : null,
    mobileImg: p.mobileImg ? urlFor(p.mobileImg).url() : null,
  }));
}

export default async function Home() {
  const projects = await getProjects();
  return (
    <main className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-transparent text-foreground">
      {/* Soft gradient + grid backdrop for depth */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,42,67,0.35),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(245,158,11,0.07),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:120px_120px] opacity-30" />
      </div>

      <Slideshow projects={projects} />
    </main>
  );
}
