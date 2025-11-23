import Slideshow from "@/components/Slideshow";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050b14] text-white">
      {/* Soft gradient + grid backdrop for depth */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,42,67,0.35),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(245,158,11,0.07),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:120px_120px] opacity-30" />
      </div>

      <Slideshow />
    </main>
  );
}
