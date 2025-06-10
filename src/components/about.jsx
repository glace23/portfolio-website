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
                    <p className="aboutLayout">
                      <strong>Hi, I'm Scott Li.</strong> I am a Software
                      Engineer currently working at Trizetto Healthcare in
                      Colorado, where I design and implement custom software
                      solutions tailored to the needs of healthcare clients.
                      Since joining in January 2023, I have worked across the
                      full software development lifecycle to deliver
                      high-performance, scalable solutions that drive efficiency
                      and improve operational workflows within the healthcare
                      sector.{" "}
                    </p>
                    <p className="aboutLayout">
                      My responsibilities include developing robust automation
                      tools and optimizing complex data processing pipelines
                      using C# and SQL, significantly enhancing system
                      performance and reducing manual effort. I design,
                      implement, and maintain relational SQL databases, ensuring
                      scalability, data integrity, and efficient querying for
                      large-scale healthcare applications processing millions of
                      records.{" "}
                    </p>
                    <p className="aboutLayout">
                      In addition to hands-on development, I collaborate closely
                      with cross-functional teams and clients to understand
                      business needs and translate them into effective technical
                      solutions. I also contribute to technical documentation
                      and best practices to promote maintainability and
                      knowledge sharing within the organization.{" "}
                    </p>
                    <p className="aboutLayout">
                      I am passionate about process optimization and continuous
                      improvement, having led initiatives that automated key
                      workflows, streamlined data pipelines, and enhanced system
                      reliability. Through efficient software design and
                      thoughtful architecture, I help our clients achieve
                      measurable improvements in operational efficiency and data
                      quality.
                    </p>
                    <p className="aboutLayout">
                      Outside of work, I enjoy staying active and connected to
                      nature—spending my free time kayaking, paddleboarding,
                      hiking, and snowboarding. I also have a passion for
                      technology at home, where I tinker with my self-built NAS,
                      experiment with optimizing containerized applications, and
                      explore new ways to leverage Docker to improve my home lab
                      environment.
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
