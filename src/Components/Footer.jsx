import React from 'react';


const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main-content">
          
          {/* COLUMN 1: BRANDING */}
          <div className="footer-column brand-col">
            <div className="footer-logo-box">
              <img src='images/footerimgKinda.png' alt="Logo" />
            </div>
            <p className="footer-info-text">
              This is the official web site of <br/> 
              <strong>Khanqah E Peer Rabbani.</strong>
            </p>
            <a href="#learn" className="learn-more-btn">Learn More</a>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="footer-column links-col">
            <h4>QUICK LINKS</h4>
            <nav className="footer-nav">
              <a href="https://www.youtube.com/@safeenaerabbani5769" target="_blank" rel="noopener noreferrer">YouTube Channel</a>
            </nav>
          </div>

          {/* COLUMN 3: CONTACT */}
          <div className="footer-column contact-col">
            <h4>CONTACT INFO</h4>
            <div className="contact-details">
              <p className="org-name">Khanqah-e-Peer Rabbani</p>
              <p>F wing, Lodha Complex, Chandresh Manor, Puja Nagar, Mira Road East</p>
              <p>Thane, Mira Bhayandar, Maharashtra 401107, India</p>
              
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 — Khanqah E Peer Rabbani</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;