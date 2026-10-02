import Nav from "@/components/vantier/Nav";
import Hero from "@/components/vantier/Hero";
import Clients from "@/components/vantier/Clients";
import Services from "@/components/vantier/Services";
import Process from "@/components/vantier/Process";
import Comparison from "@/components/vantier/Comparison";
import TrackRecord from "@/components/vantier/TrackRecord";
import NotFor from "@/components/vantier/NotFor";
import FAQ from "@/components/vantier/FAQ";
import Apply from "@/components/vantier/Apply";
import Footer from "@/components/vantier/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F2ED] font-body text-[#1A1A1A]">
      <Nav />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Comparison />
        <Process />
        <TrackRecord />
        <NotFor />
        <FAQ />
        <Apply />
      </main>
      <Footer />
    </div>
  );
}
