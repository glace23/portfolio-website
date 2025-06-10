import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <section id="colorlib-hero" className="js-fullheight" data-section="home">
        <div className="flexslider js-fullheight">
          <ul className="slides">
            <li style={{ backgroundImage: "url(images/img_bg.jpg)" }}>
              <div className="overlay"></div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 col-md-offset-3 col-md-pull-3 col-sm-12 col-xs-12 js-fullheight slider-text">
                    <div className="slider-text-inner js-fullheight">
                      <div className="desc">
                        <h1>Hi! I'm Scott</h1>
                        <h2>Welcome to My Personal Website</h2>
                        <p>
                          <a
                            href="files/Scott_Li-Resume.pdf"
                            target="_blank"
                            rel="noopener"
                            className="btn btn-primary btn-learn"
                          >
                            Download CV <i className="icon-download4"></i>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Home;
