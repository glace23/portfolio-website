import React, { Component } from "react";

class Education extends Component {
  state = {};
  render() {
    return (
      <section className="colorlib-education" data-section="education">
        <div className="colorlib-narrow-content">
          <div className="row">
            <div
              className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
              data-animate-effect="fadeInLeft"
            >
              <span className="heading-meta">Education</span>
              <h2 className="colorlib-heading animate-box">Education</h2>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-12 animate-box"
              data-animate-effect="fadeInLeft"
            >
              <div className="fancy-collapse-panel">
                <div
                  className="panel-group"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="true"
                >
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <h4 className="panel-title">
                        <a
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Bachelor's Degree in Computer Science
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseOne"
                      className="panel-collapse collapse in"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                    >
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-6">
                            <p>Oregon State University, Corvallis, Oregon</p>
                            <p>September 2020 – March 2022</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingTwo">
                      <h4 className="panel-title">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Bachelor's Degree in Finance
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseTwo"
                      className="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingTwo"
                    >
                      <div className="panel-body">
                        <p>Washington State University, Pullman, Washington</p>
                        <p>August 2015 – December 2018</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Education;
