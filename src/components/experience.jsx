import React, { Component } from "react";

class Experience extends Component {
  state = {};
  render() {
    return (
      <section className="colorlib-experience" data-section="experience">
        <div className="colorlib-narrow-content">
          <div className="row">
            <div
              className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
              data-animate-effect="fadeInLeft"
            >
              <span className="heading-meta">Experience</span>
              <h2 className="colorlib-heading animate-box">Work Experience</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="timeline-centered">
                <article
                  className="timeline-entry animate-box"
                  data-animate-effect="fadeInLeft"
                >
                  <div className="timeline-entry-inner">
                    <div className="timeline-icon color-1">
                      <i className="icon-pen2"></i>
                    </div>

                    <div className="timeline-label">
                      <h2>
                        Software Engineer | Trizetto Healthcare{" "}
                        <span>Jan 2023 - Present</span>
                      </h2>
                      <ul>
                        <li>
                          Developed and implemented custom software solutions
                          using C# and SQL for healthcare clients, focusing on
                          automation, data processing, and system performance
                          improvements to enhance operational efficiency.
                        </li>
                        <li>
                          Designed, optimized, and maintained relational SQL
                          databases, ensuring scalability, data integrity, and
                          high-performance querying for large-scale healthcare
                          applications.
                        </li>
                        <li>
                          Automated workflows and optimized processes, reducing
                          manual intervention, streamlining data pipelines, and
                          improving system reliability through efficient
                          software design.
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>

                {/* <article
                  className="timeline-entry animate-box"
                  data-animate-effect="fadeInLeft"
                >
                  <div className="timeline-entry-inner">
                    <div className="timeline-icon color-1">
                      <i className="icon-pen2"></i>
                    </div>

                    <div className="timeline-label">
                      <h2>
                        Data Entry Clerk | Wells Fargo{" "}
                        <span>2020.09-2021.08</span>
                      </h2>
                      <ul>
                        <li>
                          Communicate with team members and management to
                          maintain and schedule work priorities to meet various
                          deadlines
                        </li>
                        <li>
                          Prepare and process customer data and information
                          accurately into the system
                        </li>
                        <li>
                          Review and identify documents to prevent incomplete
                          and irregular documents being inputted into the system
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>

                <article
                  className="timeline-entry animate-box"
                  data-animate-effect="fadeInRight"
                >
                  <div className="timeline-entry-inner">
                    <div className="timeline-icon color-2">
                      <i className="icon-pen2"></i>
                    </div>
                    <div className="timeline-label">
                      <h2>
                        Marketing Internship | Fidelidade{" "}
                        <span>2018.06-2018.08</span>
                      </h2>
                      <ul>
                        <li>
                          Maintain and plan a schedule for writing and posting
                          social media content
                        </li>
                        <li>
                          Conducted research on topics related to products for
                          social media content
                        </li>
                        <li>
                          Worked with colleagues planned and built a new company
                          website
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>

                <article
                  className="timeline-entry animate-box"
                  data-animate-effect="fadeInLeft"
                >
                  <div className="timeline-entry-inner">
                    <div className="timeline-icon color-3">
                      <i className="icon-pen2"></i>
                    </div>
                    <div className="timeline-label">
                      <h2>
                        Internship | MHK Insurance Services{" "}
                        <span>2017.05-2017.07</span>
                      </h2>
                      <ul>
                        <li>
                          Prepare and planed a seminar event with a team of five
                          people
                        </li>
                        <li>
                          Maintain and monitor event timelines and reporting of
                          event status
                        </li>
                        <li>
                          Provided clients with daily communication, support,
                          and status updates
                        </li>
                      </ul>
                    </div>
                  </div>
                </article> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Experience;
