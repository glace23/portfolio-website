import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navigation from "./components/navigation";
// import About from "./components/about";
// //import Counter from "./components/counter";
// import Skills from "./components/skills";
// import Education from "./components/education";
// import Experience from "./components/experience";
// import Home from "./components/home";
// import Contact from "./components/contact";
// import Projects from "./components/projects";
import HomePage from "./pages/HomePage";
import FunPage from "./pages/FunPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/fun" element={<FunPage />} />
      </Routes>
    </Router>
  );
}

//ReactDOM.render(<App />, document.getElementById("root"));
export default App;
