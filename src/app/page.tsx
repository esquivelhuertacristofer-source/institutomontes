import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsTicker from "@/components/StatsTicker";
import DiffGrid from "@/components/DiffGrid";
import ProgramDetails from "@/components/ProgramDetails";
import BentoGallery from "@/components/BentoGallery";
import LatestActivities from "@/components/LatestActivities";
import AdmissionProcess from "@/components/AdmissionProcess";
import Testimonials from "@/components/Testimonials";
import LocationMap from "@/components/LocationMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full relative">
        <Hero />
        <ProgramDetails />
        <DiffGrid />
        <StatsTicker />
        <BentoGallery />
        <LatestActivities />
        <AdmissionProcess />
        <Testimonials />
        <LocationMap />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
