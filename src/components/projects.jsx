import React, { Component } from "react";

class Projects extends Component {
  state = {};
  render() {
    return (
      <section className="colorlib-experience" data-section="projects">
        <div className="colorlib-narrow-content">
          <div className="row">
            <div
              className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
              data-animate-effect="fadeInLeft"
            >
              <span className="heading-meta">Projects</span>
              <h2 className="colorlib-heading animate-box">Projects</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="timeline-centered">
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
                        Portfolio Website <span>Oct 2022</span>
                      </h2>
                      <ul>
                        <li>Created a personal website using React JS</li>
                        <li>Deployed website on github.io using Node JS</li>
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
                        TERA SQL Interface Project{" "}
                        <span>Jan 2022 - Mar 2022</span>
                      </h2>
                      <ul>
                        <li>
                          Built a user interactive interface with tableau based
                          on the client's requested requirements and features
                        </li>
                        <li>
                          Preformed data cleaning on the database to eliminate
                          incomplete data in the database
                        </li>
                        <li>
                          Created multiple views for the data set containing
                          only the data is of interest
                        </li>
                        <li>
                          Weekly communication with the client on the status of
                          our project, and updated the project accordingly based
                          on the client's feedback
                        </li>
                        <li>
                          Write extensive documentation and instructions for the
                          tableau interface and data cleaning procedures
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
                        Snake Game <span>Sep 2025</span>
                      </h2>
                      <ul>
                        <li>
                          <a href="#snakegame">
                            <strong>🐍 Snake Game - Click Here to View</strong>
                          </a>
                        </li>
                        <li>
                          📦 <strong>Overview:</strong> Complete React-based
                          Snake Game with core mechanics, multiple gameplay
                          modes, power-ups, scoreboard, and responsive UI.
                        </li>
                        <li>
                          🎮 <strong>Core Gameplay:</strong>
                          <ul>
                            <li>
                              Snake moves continuously, grows when eating food,
                              and ends the game on collision or out-of-bounds.
                            </li>
                            <li>
                              Controls: Arrow keys / WASD, pause, restart, and
                              reset options.
                            </li>
                          </ul>
                        </li>
                        <li>
                          🍎 <strong>Food & Power-Ups:</strong>
                          <ul>
                            <li>
                              Food spawns randomly and increases score and snake
                              length.
                            </li>
                            <li>
                              Power-ups: 🟢 green (speed), 🔵 blue (extra
                              score), 🟣 purple (special bonus) with
                              time-limited effects.
                            </li>
                          </ul>
                        </li>
                        <li>
                          🛠️ <strong>Game Modes:</strong> Normal, Hard (faster,
                          no grid lines), Power-Up mode, and toggleable Grid
                          Lines mode.
                        </li>
                        <li>
                          🖥️ <strong>UI & Visuals:</strong>
                          <ul>
                            <li>
                              Responsive game board (80vmin) with light/dark
                              mode support.
                            </li>
                            <li>
                              Scoreboard and game legend to explain food and
                              power-ups.
                            </li>
                            <li>
                              Menus: Welcome screen, pause/reset/settings.
                            </li>
                          </ul>
                        </li>
                        <li>
                          🔧 <strong>Technical Highlights:</strong>
                          <ul>
                            <li>
                              React Hooks for game logic, keyboard controls, and
                              settings timer.
                            </li>
                            <li>
                              Centralized state management for snake, food,
                              power-ups, and modes.
                            </li>
                            <li>
                              Scoped CSS modules and CSS variables for styling
                              and theming.
                            </li>
                          </ul>
                        </li>
                        <li>
                          🎯 <strong>Why This Project:</strong> Demonstrates
                          real-time game loops, state synchronization, modular
                          React code, and strong UI/UX design.
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
                {/* <article
                  className="timeline-entry animate-box"
                  data-animate-effect="fadeInTop"
                >
                  <div className="timeline-entry-inner">
                    <div className="timeline-icon color-4">
                      <i className="icon-pen2"></i>
                    </div>
                    <div className="timeline-label">
                      <h2>
                        Wastagram <span>2021.09-2021.12</span>
                      </h2>
                      <ul>
                        <li>
                          Built an interactive mobile app, where the user can
                          make a post similar to an Instagram post, using
                          Google's Flutter SDK and Dart language
                        </li>
                        <li>
                          Stored user generated post data created by the app to
                          MySQL database and Firebase backend services
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
                    <div className="timeline-icon color-5">
                      <i className="icon-pen2"></i>
                    </div>
                    <div className="timeline-label">
                      <h2>
                        Class Scheduler Website <span>2021.03-2021.06</span>
                      </h2>
                      <ul>
                        <li>
                          Created a class scheduler website using Node JS,
                          Javascript, and Express Framework
                        </li>
                        <li>
                          Stored and pulled class data from a MySQL backend
                          service
                        </li>
                      </ul>
                    </div>
                  </div>
                </article> */}

                <article
                  className="timeline-entry begin animate-box"
                  data-animate-effect="fadeInBottom"
                >
                  <div className="timeline-entry-inner">
                    <div className="timeline-icon color-none"></div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Projects;
