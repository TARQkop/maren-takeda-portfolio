import Providers from "@/components/Providers";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Expertise from "@/components/sections/Expertise";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <Providers>
      <a
        href="#about"
        className="sr-only z-[110] rounded-full bg-ink px-5 py-3 text-bone focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Loader />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Expertise />
        <Experience />
        <Contact />
      </main>
    </Providers>
  );
}
