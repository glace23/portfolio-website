import React, { Component } from "react";

class About extends Component {
  state = {};
  render() {
    return (
      <section className="colorlib-about" data-section="about">
        <div className="colorlib-narrow-content">
          <div className="row">
            <div className="col-md-12">
              <div
                className="row row-bottom-padded-sm animate-box"
                data-animate-effect="fadeInLeft"
              >
                <div className="col-md-12">
                  <div className="about-desc">
                    <span className="heading-meta">About Me</span>
                    <h2 className="colorlib-heading">Who Am I?</h2>
                    <p>
                      <strong>Hi, I am Scott Li</strong> I recently graduated
                      from Oregon State University with a bachelor’s degree in
                      Computer Science. In the past, I have completed two
                      internships in the insurance industry when studying for my
                      first degree. After working in the insurance industry, I
                      decided to pursue another degree in Computer Science,
                      since I felt that I was more passionate about solving
                      problems through programming and enabling new things
                      through technology.
                    </p>
                    <p>
                      During my time studying computer science, I worked on a
                      project for a faculty member in the agricultural
                      department to create a SQL UI for their aging database
                      structure. We thoroughly discussed with our client what
                      are the functionalities and the end product that she wants
                      from the initial project description. In the end, we were
                      able to deliver her an off the shelf solution, a Tableau
                      dashboard, and preformed data cleaning in the database to
                      deliver a satisfactory product.
                    </p>
                    <p>
                      In my free time, I like to tinker with my home network
                      attached server, such as setting up Dockers and optimizing
                      my system.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-3 animate-box"
                  data-animate-effect="fadeInRight"
                >
                  <div className="services color-2">
                    <span className="icon2">
                      <i className="icon-globe-outline"></i>
                    </span>
                    <h3>Web Design</h3>
                  </div>
                </div>
                <div
                  className="col-md-3 animate-box"
                  data-animate-effect="fadeInTop"
                >
                  <div className="services color-3">
                    <span className="icon2">
                      <i className="icon-data"></i>
                    </span>
                    <h3>Software</h3>
                  </div>
                </div>
                <div
                  className="col-md-3 animate-box"
                  data-animate-effect="fadeInBottom"
                >
                  <div className="services color-4">
                    <span className="icon2">
                      <i className="icon-phone3"></i>
                    </span>
                    <h3>Application</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-12 animate-box"
                  data-animate-effect="fadeInLeft"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
