import NeuralBackground from "./components/NeuralBackground";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05050c] text-white">
      {/* Ambient background layers */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.08),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.08),_transparent_55%)]" />
      </div>

      <NeuralBackground />
      <CustomCursor />
      <ScrollProgress />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating AI assistant — the centerpiece AI feature */}
      <AIAssistant />
    </div>
  );
}
