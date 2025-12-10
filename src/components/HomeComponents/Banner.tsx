import { useEffect, useRef } from "react";
import gsap from "gsap";
import banner from "../../assets/images/banner1.png";
import CommonButton from "../common/CommonButton";
import Title from "../common/Title";

interface BannerProps {
  bannerData: {
    cms_image_url: string;
  };
  titleData: {
    title: string;
    description: string;
  };
}

const Banner = ({ bannerData, titleData }: BannerProps) => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const bannerImgRef = useRef<HTMLImageElement | null>(null);
  const floatingImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
        })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          [bannerImgRef.current, floatingImgRef.current],
          {
            opacity: 0,
            y: 60,
            scale: 1.05,
            duration: 1.2,
            stagger: 0.15,
          },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding-y">
      {/* ================= TEXT ================= */}
      <div className="font-playfair text-center px-4">
        <div ref={titleRef}>
          <Title level="title64" className="max-w-5xl mx-auto">
            <span dangerouslySetInnerHTML={{ __html: titleData?.title }} />
          </Title>
        </div>

        <div >
          <Title
            level="title18"
            className="text-Secondary font-poppins max-w-3xl mx-auto"
          >
            {titleData?.description}
          </Title>
        </div>

<div >
  <CommonButton
    to="/catalogue"
    as="link"
    className="mx-auto mt-6 bg-Primary inline-flex items-center gap-2 text-white font-poppins"
  >
    Shop Now
  </CommonButton>
</div>

      </div>

      {/* ================= IMAGES ================= */}
      
      <div className="relative">
        <img
          ref={bannerImgRef}
          src={banner}
          alt="banner background"
          className="mx-auto"
        />

        <img
          ref={floatingImgRef}
          src={bannerData?.cms_image_url}
          alt="product"
          className="
            absolute
            top-[50px]
            left-1/2
            -translate-x-1/2
            w-[25%]
            object-cover
          "
        />
      </div>
    </section>
  );
};

export default Banner;
