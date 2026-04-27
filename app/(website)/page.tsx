import WebsiteHome from "@/components/WebsiteHome";
import {
  getWordPressProjects,
  getWordPressSocialProof,
  getWordPressTestimonials,
} from "@/lib/wordpress";

export default async function Home() {
  const [projects, socialProof, testimonials] = await Promise.all([
    getWordPressProjects(),
    getWordPressSocialProof(),
    getWordPressTestimonials(),
  ]);

  return (
    <WebsiteHome
      projects={projects}
      socialProof={socialProof}
      testimonials={testimonials}
    />
  );
}
