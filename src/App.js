import "./App.css";
import React from "react";
import Navigation from "./components/navigation";
import About from "./components/about";
//import Counter from "./components/counter";
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
          <div className="mainLayout">
            <About />
            <Education />
            <Projects />
            <Skills />
            <Experience />
          </div>
          <Contact />
        </div>
      </div>
    </div>
  );
}

//ReactDOM.render(<App />, document.getElementById("root"));
export default App;
