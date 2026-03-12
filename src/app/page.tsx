import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Instructors from "@/components/Instructors";
import Schedule from "@/components/Schedule";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <About />
      <Courses />
      <Instructors />
      <Schedule />
      <Gallery />
      <Testimonials />
      <Pricing />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
