import React from "react";
import '../styles/Home.css';
const Home = () => {

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/aniket_kumar_biswas_cv.pdf";
    link.download = "aniket_kumar_biswas_cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-container">
          {/* LEFT */}
          <div className="hero-content">
            <p className="hero-subtitle">Hello, I am</p>
            <span className="hero-title bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Aniket BISWAS
            </span>

            <p className="hero-subtitle">
              Building high-quality, scalable cross-platform mobile applications using <strong>React Native</strong> for Android and iOS
            </p>

            <div className="hero-tech">
              <div className="tech-pill">
                <span className="material-symbols-outlined">code</span>
                React Native
              </div>
              <div className="tech-pill">
                <span className="material-symbols-outlined">android</span>
                Android
              </div>
              <div className="tech-pill">
                <span className="material-symbols-outlined">ios</span>
                iOS
              </div>
            </div>

            <div className="hero-actions">
              <button className="btn-primary">View Projects</button>
              <button className="btn-secondary"
                onClick={downloadCV}
              >
                <span className="material-symbols-outlined">download</span>
                Download CV
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-visual">
            <img
              src="https://avatars.githubusercontent.com/u/110116971?s=400&u=0cf1056cc49742cda25a2e34d295684989b7c1ac&v=4"
              alt="Aniket Biswas"
              className="hero-image"
            />

            <div className="hero-completion">
              <span className="material-symbols-outlined hero-completion-icon">check_circle</span>
              <div>
                <p>100%</p>
                <span>Client Satisfaction</span>
              </div>
            </div>

            <div className="hero-experience">
              <span className="material-symbols-outlined hero-experience-icon">workspace_premium</span>
              <div>
                <small>EXPERIENCE</small>
                <p>2+ Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
