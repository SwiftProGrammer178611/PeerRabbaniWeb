import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AlternatingSection = ({ image, text, reverse }) => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggerConfig = {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom top",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      };

      // IMAGE
      gsap.fromTo(
        imgRef.current,
        { x: reverse ? 120 : -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: window.innerWidth < 768 ? 0.9 : 1.2,
          ease: "power4.out",
          scrollTrigger: triggerConfig,
        }
      );

      // TEXT
      gsap.fromTo(
        textRef.current,
        { x: reverse ? -120 : 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: window.innerWidth < 768 ? 0.9 : 1.2,
          delay: 0.1,
          ease: "power4.out",
          scrollTrigger: triggerConfig,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <section
      ref={sectionRef}
      className={`alternating-section ${reverse ? "is-reversed" : ""}`}
    >
      <div className="content-wrapper">
        <div className="image-container" ref={imgRef}>
          <div className="gold-card">
            <img src={image} alt="Spiritual Leader" />
          </div>
        </div>

        <div className="text-container" ref={textRef}>
          <h2 className="urdu-quote">{text}</h2>
        </div>
      </div>
    </section>
  );
};

export default AlternatingSection;
