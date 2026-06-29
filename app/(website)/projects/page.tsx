import type { Metadata } from "next";

import ProjectsPage from "@/components/ProjectsPage";
import { getWordPressProjects } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Projects | Imadi Innovations",
  description: "Explore Imadi Innovations project work across web apps, mobile apps, business dashboards, logistics systems, healthcare operations, HR platforms, and automation workflows.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Imadi Innovations",
    description: "Case-study style project work built for real business operations.",
    url: "https://imadi-innovations.com/projects",
    siteName: "Imadi Innovations",
    type: "website",
  },
};

export default async function Projects() {
  const projects = await getWordPressProjects();

  return <ProjectsPage projects={projects} />;
}
