import Hero from "../components/Layout/Hero";
import Features from "../components/Layout/Feature";
import Pricing from "../components/Layout/Pricing";
import Faq from "../components/Layout/Faq";
import Above from "../components/Layout/Above";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Above/>
    </div>
  );
}

export default HomePage;
