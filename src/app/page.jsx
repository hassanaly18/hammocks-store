import About from "@/components/About";
import Call from "@/components/Call";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <Hero/>
      <FeaturedProducts/>
      <About/>
      <Testimonials/>
      <Call/>
    </div>
  );
}
