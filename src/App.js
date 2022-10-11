import "./App.css";
import Navigation from "./components/navigation";
import About from "./components/about";
import Counter from "./components/counter";
import Skills from "./components/skills";
import Education from "./components/education";
import Experience from "./components/experience";
import Home from "./components/home";
import Contact from "./components/contact";
import Projects from "./components/projects";

function App() {
  return (
    <div id="colorlib-page">
      <div id="container-wrap">
        <Navigation />
        <div id="colorlib-main">
          <Home />
          <About />
          <Counter />
          <Education />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
