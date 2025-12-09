import Layout from "@/components/Layout";
import Hero from "@/components/sections/Hero";
import WhoWeAre from "@/components/sections/WhoWeAre";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <WhoWeAre />
      <FeaturedWorks />
      <Services />
      <Testimonials />
      <Contact />
    </Layout>
  );
}
