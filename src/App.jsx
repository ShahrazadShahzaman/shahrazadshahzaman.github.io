import Navbar from "./components/layouts/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/layouts/Footer";
import Education from "./components/sections/Education";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Education/>
      <Skills/>
      <Experience/>
      <Projects/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default App;