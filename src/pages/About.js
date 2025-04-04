import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import "./About.css"; 
import Navbar from "../components/Navbar";
import Footer from "../NewPages/Footer";


const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  return (
    <div>
      <Navbar />
    <div className="about-container">
      
      {/* Hero Section */}
      <section className="hero-section" >
        <div className="hero-background">
          <h1 className="hero-titles" data-aos="fade-up"> About Us</h1>
          {/* <h1 className="hero-title" data-aos="fade-up">Soaring Above with Excellence</h1>
          <p className="hero-subtitle" data-aos="fade-up">Connecting the world, one flight at a time</p> */}
        </div>
      </section>

      {/* Info Section */}
      <section className="info">
        <div className="flip-card">
          <div className="flip-card-inner">
            {/* Front of the card */}
            <div className="flip-card-front" data-aos="fade-up">
              <h2>About SkyWings Aviation</h2>
              <p>Click to know more about us!</p>
            </div>

            {/* Back of the card */}
            <div className="flip-card-back">
              <p className="about-company">
                At SkyWings Aviation, we are committed to redefining air travel with cutting-edge technology and exceptional service. With a fleet of modern, fuel-efficient aircraft, we connect passengers to over 100 destinations worldwide, ensuring safety, comfort, and sustainability at every altitude. Our highly trained pilots and dedicated crew work around the clock to provide a seamless flying experience, from takeoff to landing. At SkyWings, we believe in not just transporting people but creating memorable journeys, whether it's for business or leisure. Innovation is at the heart of our operations, as we continuously strive to make air travel more accessible, eco-friendly, and efficient for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" data-aos="fade-up">
        <h2 className="section-title" data-aos="fade-up">Our Journey</h2>
        <div className="timeline" data-aos="fade-up">
          <div className="timeline-item" data-aos="fade-up">
            <h3>2014</h3>
            <p>Founded by Kanika Tekriwal and Sudheer Perla</p>
          </div>
          <div className="timeline-item" data-aos="fade-up">
            <h3>2016</h3>
            <p>xelevate achieves profitability</p>
          </div>
          <div className="timeline-item" data-aos="fade-up">
            <h3>2018</h3>
            <p>Partnered with Boeing HorizonX to launch Sky Shuttle</p>
          </div>
          <div className="timeline-item" data-aos="fade-up">
            <h3>2020</h3>
            <p>xelevate responds to COVID emergency with xelevateRescue flights</p>
          </div>
          <div className="timeline-item" data-aos="fade-up">
            <h3>2020</h3>
            <p>xelevate Learn Academy launched to train pilots and crew in-house</p>
          </div>
          <div className="timeline-item" data-aos="fade-up">
            <h3>2022</h3>
            <p>Continued growth and expansion</p>
          </div>
          <div className="timeline-item" data-aos="fade-up">
            <h3>2023</h3>
            <p>Further achievements to be announced</p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section" data-aos="fade-up">
        <h2 className="section-title" data-aos="fade-up">Our Mission</h2>
        <p className="mission-text" data-aos="fade-up">
          We are dedicated to providing safe, efficient, and innovative air travel experiences. Our goal is to lead the future of aviation, ensuring the highest levels of safety and sustainability.
        </p>
      </section>

      {/* Vision Statement */}
      <section className="mission-section" data-aos="fade-up">
        <h2 className="section-title" data-aos="fade-up">Our Vision</h2>
        <p className="mission-text" data-aos="fade-up">
          We are dedicated to providing safe, efficient, and innovative air travel experiences. Our goal is to lead the future of aviation, ensuring the highest levels of safety and sustainability.
        </p>
      </section>

      {/* Leadership Section */}
      <section className="team-section" data-aos="fade-up">
        <h2 className="section-title" style={{ textAlign: "center" }}>Leadership</h2>
        <div className="team-grid" data-aos="fade-up">
          {/* First Team Member */}
          <div className="team-member">
            <img src="https://d3tfanr7troppj.cloudfront.net/static_files/images/000/004/605/original/Kanika_Tekriwal.png?1695280744" alt="Kanika Tekriwal" className="team-img" />
            <h3 className="team-name">Kanika Tekriwal</h3>
            <p className="team-role">Founder</p>
            <p className="about">Kanika Tekriwal has more than a decade of experience in the aviation industry. She reshaped xelevate from a technology-driven marketplace to a leading asset management firm, defying industry bias along the way. Kanika is a woman who believes in adapting and modifying her plans rather than giving up, but never losing sight of the vision.</p>
          </div>

          {/* Second Team Member */}
          <div className="team-member">
            <img src="https://d3tfanr7troppj.cloudfront.net/static_files/images/000/004/605/original/Kanika_Tekriwal.png?1695280744" alt="Hinata" className="team-img" />
            <h3 className="team-name">Hinata</h3>
            <p className="team-role">Co-Founder</p>
            <p className="about">Kanika Tekriwal has more than a decade of experience in the aviation industry. She reshaped xelevate from a technology-driven marketplace to a leading asset management firm, defying industry bias along the way.</p>
          </div>
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="team-section" data-aos="fade-up">
        <h2 className="section-title" style={{ textAlign: "center" }}>Executive Team</h2>
        <div className="team-grid" data-aos="fade-up">
          {/* First Executive Member */}
          <div className="team-member">
            <img src="https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/244/original/Jon_image.png?1700306835" alt="Jonathan Sumner" className="team-img" />
            <h3 className="team-name">Jonathan Sumner</h3>
            <p className="team-role">CSO</p>
            <p className="about">Jonathan Sumner leads the strategy and innovation efforts of SkyWings, ensuring that we stay ahead in the rapidly changing aviation landscape with cutting-edge solutions.</p>
          </div>

          {/* Second Executive Member */}
          <div className="team-member">
            <img src="https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/609/original/Akshat_aggarwal_website.png?1705471288" alt="Akshat Aggarwal" className="team-img" />
            <h3 className="team-name">Akshat Aggarwal</h3>
            <p className="team-role">CFO</p>
            <p className="about">Akshat Aggarwal manages the financial operations and strategy of SkyWings, driving profitability and sustainable growth while ensuring financial health across all operations.</p>
          </div>

          {/* Third Executive Member */}
          <div className="team-member">
            <img src="https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/609/original/Akshat_aggarwal_website.png?1705471288" alt="Arijit Moulik" className="team-img" />
            <h3 className="team-name">Arijit Moulik</h3>
            <p className="team-role">Sr. VP Commercial</p>
            <p className="about">Arijit Moulik oversees all commercial operations, ensuring that SkyWings continues to expand its reach while maintaining the highest standards of customer service and operational excellence.</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default About;
