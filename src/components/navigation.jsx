import React, { Component } from "react";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <div>
        <a
          href="#home"
          className="js-colorlib-nav-toggle colorlib-nav-toggle"
          data-toggle="collapse"
          data-target="#navbar"
          aria-expanded="false"
          aria-controls="navbar"
        >
          <i></i>
        </a>
        <aside id="colorlib-aside" className="border js-fullheight">
          <div className="text-center">
            <div
              className="author-img"
              style={{ backgroundImage: "url(images/about.jpg)" }}
            ></div>
            <h1 id="colorlib-logo">
              <a href="#" data-nav-section="home">
                Scott Li
              </a>
            </h1>
            <span className="position">Software Engineer</span>
          </div>
          <nav id="colorlib-main-menu" role="navigation" className="navbar">
            <div id="navbar" className="collapse">
              <ul>
                <li className="active">
                  <a href="#home" data-nav-section="home">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" data-nav-section="about">
                    About
                  </a>
                </li>
                <li>
                  <a href="#education" data-nav-section="education">
                    Education
                  </a>
                </li>
                <li>
                  <a href="#projects" data-nav-section="projects">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" data-nav-section="skills">
                    Skills
                  </a>
                </li>

                <li>
                  <a href="#experience" data-nav-section="experience">
                    Experience
                  </a>
                </li>

                <li>
                  <a href="#contact" data-nav-section="contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="colorlib-footer">
            <ul>
              <li>
                <a
                  href="https://github.com/glace23"
                  target="_blank"
                  rel="noopener"
                >
                  <i className="icon-github"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/scott-li-3ab022143/"
                  target="_blank"
                  rel="noopener"
                >
                  <i className="icon-linkedin2"></i>
                </a>
              </li>
            </ul>
            <span>
              <i className="icon-mail">
                <a href="mailto:scottmli2343@gmail">scottmli2343@gmail</a>
              </i>
            </span>
          </div>
        </aside>
      </div>
    );
  }
}

export default Navigation;
