import { useEffect, useRef } from "react";
import gsap from "gsap";
import banner from "../../assets/images/banner.png";
import CommonButton from "../common/CommonButton";
import Title from "../common/Title";

const Banner = () => {
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from([title1Ref.current, title2Ref.current], {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
      })
        .from(
          subtitleRef.current,
          { opacity: 0, y: 30, duration: 0.8 },
          "-=0.5"
        )
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          imageRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 1.06,
            duration: 1.2,
          },
          "-=0.3"
        );
    });

    return () => ctx.revert(); // clean animation on unmount
  }, []);

  return (
    <div className="section-padding-y">
      <div className="font-playfair text-center px-4">
        <Title level="title64" ref={title1Ref}>
          Peptides Crafted to the Highest
        </Title>

        <Title
          level="title64"
          className="text-Primary"
          ref={title2Ref}
        >
          GMP Standards
        </Title>

        <Title
          level="title18"
          className="text-Secondary font-poppins max-w-3xl mx-auto"
          ref={subtitleRef}
        >
          Produced in GMP-certified facilities for pure, consistent quality—no
          fillers, no buffers, just clean, raw peptides.
        </Title>

        <CommonButton
          className="mx-auto mt-6 bg-Primary text-white font-poppins"
          ref={buttonRef}
        >
          Shop Now
        </CommonButton>
      </div>

      <img
        src={banner}
        ref={imageRef}
        alt="banner"
        className="mt-10 mx-auto"
      />
    </div>
  );
};

export default Banner;
