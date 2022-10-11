import React, { Component } from "react";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <div>
        <a
          href="https://www.facebook.com"
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
              <a href="index.html">Jackson Ford</a>
            </h1>
            <span className="position">
              <a href="https://www.facebook.com">UI/UX/Designer</a> in
              Philippines
            </span>
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
            <p>
              <small>
                <span>
                  Demo Images: <a href="https://unsplash.com/">Unsplash.com</a>
                </span>
              </small>
            </p>
            <ul>
              <li>
                <a href="https://www.facebook.com">
                  <i className="icon-facebook2"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com">
                  <i className="icon-twitter2"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com">
                  <i className="icon-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com">
                  <i className="icon-linkedin2"></i>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
  }
}

export default Navigation;
