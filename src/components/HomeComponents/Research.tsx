import researchSection from "../../assets/images/researchSection.png"
import Title from "../common/Title"

interface ResearchProps {
  heroData: {
    id: number;
    title: string;
    image: string;
    description: string;
    section_in_page: string;
    page: string;
    cms_image_url: string;
    status: number;
  };
}
const Research = ({heroData} : ResearchProps) => {
  console.log(heroData)
  return (
   <div className="section-padding-x">
  <div className="font-playfair text-center flex flex-col gap-4">
    <Title level="title48">{heroData?.title}</Title>

    <Title
      level="title18"
      className="text-Secondary font-poppins max-w-5xl mx-auto"
    >
      {heroData?.description}
    </Title>
  </div>

  {/* IMAGE SECTION */}
  <div className="w-full mt-8">
    <img
      src={heroData?.cms_image_url}
      alt="banner"
      className="w-full h-auto max-h-[800px] object-cover rounded-lg"
    />
  </div>
</div>

  )
}

export default Research