import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import AlternatingSection from "./AlternatingSection";
import "./App.css";
import "./Location.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import btmImg from "./assets/footerimgKinda.png";
import initialData from "./Json Files/App.json";
import EventsSection from "./EventsSection";
import Footer from "./Components/Footer";


gsap.registerPlugin(ScrollTrigger);

function App({ previewData, onExitPreview }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const galleryRef = useRef(null);
  const progressRef = useRef(null);

  const [siteData, setSiteData] = useState(initialData);
  const data = previewData || siteData;

  const data2 = [
    { img: "/images/Image5.JPG", text: "Yazda Madaar Mere Daaro Madar Inpar, Taalib Hua To Kya Hai Mere Sanam Ko Dekho" },
    { img: "/images/Image6.JPG", text: "Lutt Lo Dewano Tum Rabbani Peer Ke Haatho Se, Is Jagah Pe Yazda Ka, Sadka Batne Waala Hai" },
    { img: "/images/Image10.JPG", text: "Peer E Yazda Ki Maiy Jisme Hai, Woh Paimana Hai Rabbani Piya" },
    { img: "/images/Image8.JPG", text: "Rabbani Ko Tumne Munawwar Karke, Dono Aalam Me Azmat Bada Di" },
    { img: "/images/Image9.JPG", text: "Bismillah Shah Peer Ne, Jaam e Mai PIla Diya, Apna Bana Ke Rabbani KO, Munawwar Sanam Bana Diya" },
  ];

  useEffect(() => {
    if (!previewData) {
      const saved = localStorage.getItem("kpr_site_data");
      if (saved) setSiteData(JSON.parse(saved));
    }
  }, [previewData]);

useEffect(() => {
  // ✅ Mobile-safe ScrollTrigger config (run once)
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  const handleScroll = () => {
    if (!overlayRef.current || !cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const cardCenter = cardRect.top + cardRect.height / 2;
    const middle = windowHeight / 2;
    const distance = Math.max(
      0,
      Math.min(1, Math.abs(cardCenter - middle) / middle)
    );

    overlayRef.current.style.background = `rgba(0,0,0,${
      0.35 * (1 - distance)
    })`;

    if (progressRef.current) {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current.style.width = `${(scrollTop / docHeight) * 100}%`;
    }
  };

  window.addEventListener("scroll", handleScroll);

  const ctx = gsap.context(() => {
    gsap.utils.toArray(".gallery-item-top").forEach((item) => {
      gsap.fromTo(
        item,
        { x: 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 20%",
            scrub: window.innerWidth > 768 ? 0.5 : false,
          },
        }
      );
    });

    gsap.utils.toArray(".gallery-item-bottom").forEach((item) => {
      gsap.fromTo(
        item,
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 20%",
            scrub: window.innerWidth > 768 ? 0.5 : false,
          },
        }
      );
    });

    gsap.utils.toArray(".quote-box").forEach((item) => {
      gsap.fromTo(
        item,
        { y: 80, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "bottom 25%",
            scrub: window.innerWidth > 768 ? 0.5 : false,
          },
        }
      );
    });

    gsap.utils.toArray(".planner-section").forEach((item) => {
      gsap.fromTo(
        item,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 20%",
            scrub: window.innerWidth > 768 ? 0.5 : false,
          },
        }
      );
    });
  }, galleryRef);

  // ✅ iOS Safari refresh fix
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    ctx.revert();
  };
}, []);


  return (
    <div className="app-root">
      {onExitPreview && (
        <button onClick={onExitPreview} className="exit-preview-btn">EXIT PREVIEW</button>
      )}

      <Navbar />
      

      <section className="hero-fixed" />
      <section ref={overlayRef} className="hero-dark-overlay" />

      <section className="hero-pinned-content">
        <div className="hero-content-container">
          <div className="info-box info-box-mobile-clean">
            <h3>{data.hero.line1}</h3>
          </div>
          <div className="info-box info-box-mobile-clean">
            <h3>{data.hero.line2}</h3>
          </div>
        </div>
      </section>
      

      <main className="scroll-layer">
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-card" ref={cardRef}>
              <h2>{data.hero.cardTitle}</h2>
              <p>
                Hazrat Sayyed Mohamed Munawwar Ali Shah<br />
                Madar Qadri Rozekari<br />
                al-maroof<br />
                Peer Rabbani (R.A.)
              </p>
            </div>
          </div>
        </section>

        <EventsSection/>


        <section className="gallery-section" ref={galleryRef}>
          <div className="gallery-container">
            <div className="gallery-item-top">
              <img src={data.gallery.topImage} alt="Top Portrait" />
            </div>

            <div className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900 via-emerald-950 to-black p-6 shadow-2xl md:p-20">
  
  {/* Elegant Background Accents */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>

  <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
    
    {/* Logo */}
    <div className="mb-12">
      <img 
        src='/images/bismin.png' 
        alt="Logo" 
        className="h-12 w-auto object-contain brightness-125 md:h-16" 
      />
    </div>

    {/* Quote Container with Absolute Marks */}
    <div className="relative px-8 py-4 md:px-16">
      {/* Opening Quote - Top Left */}
      <span className="absolute left-0 top-0 font-serif text-6xl text-emerald-500/30 md:text-8xl md:-left-4 md:-top-6">
        “
      </span>

      <blockquote className="text-center font-serif text-2xl italic leading-relaxed text-emerald-50 md:text-4xl md:leading-extra-loose">
        {data.gallery.quoteLines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i !== data.gallery.quoteLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </blockquote>
      

      {/* Closing Quote - Bottom Right */}
      <span className="absolute right-0 bottom-0 font-serif text-6xl text-emerald-500/30 md:text-8xl md:-right-4 md:-bottom-12">
        ”
      </span>
    </div>

    {/* Author Section */}
    <div className="mt-16 flex flex-col items-center">
      <div className="mb-4 h-px w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
      <cite className="text-xs font-light uppercase tracking-[0.4em] text-emerald-400 md:text-sm">
        {data.gallery.quoteAuthor}
      </cite>
    </div>

  </div>
</div>

            <div className="gallery-item-bottom">
              <img src={data.gallery.bottomImage} alt="Bottom Portrait" />
              <div className="overlay-image-container">
                <img src={data.gallery.overlayImage} alt="Overlay" className="overlay-img" />
              </div>
            </div>

            <div className="planner-section">
              <br/>
              <br/>
              <br/>
              <h2 className="planner-title"> Aap Yazda Ke Raaj Dulare, Aapna Jeewan Unpe Waare</h2>
              <h2 className="planner-title"> Tum Yazda Ke aakh Ke Taare, Mere Aaka Peer Rabbani!</h2>
              
              <br/>
              <p className="text-red-900 text-2xl">
       By: Hazrat Peer Aadil
      </p>
            </div>
          </div>
        </section>

        <div>
          {data2.map((item, index) => (
            <AlternatingSection
              key={index}
              className="alternating-section"
              image={item.img}
              text={item.text}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
        <Footer/>
        <div className="scroll-progress" ref={progressRef}></div>
      </main>
    </div>
  );
}

export default App;
