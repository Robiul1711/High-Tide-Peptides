import researchSection from "../../assets/images/researchSection.png"
import Title from "../common/Title"
const Research = () => {
  return (
    <div className="section-padding-x">
           <div className="font-playfair text-center flex flex-col gap-4">
        <Title level="title48" className="">Research Peptides - Only Application Guidelines </Title>
        <Title level="title18" className="text-Secondary font-poppins max-w-5xl mx-auto"> These peptides are for research use only, suitable for scientific studies, lab testing, and biochemical experiments. They are not approved for medical use and should not be administered to humans or animals. </Title>
        </div>
        <img src={researchSection} alt="banner" />
    </div>
  )
}

export default Research