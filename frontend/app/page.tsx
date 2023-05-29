import Navbar from "./components/navbar/Navbar";
import Intro from "./components/Intro/Intro";
import Pricing from "./components/Pricing/Pricing";
import Features from "./components/features/Features";

export default function Home() {
  return (
    <div className="w-full h-auto bg-slate-900 text-white">
      <div className="max-w-screen-xl mx-auto">
        <Navbar />
        <Intro />
        <Features />
        <Pricing />
      </div>
    </div>
  );
}
