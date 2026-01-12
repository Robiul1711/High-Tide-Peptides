// import { medicineData } from "../../dummyData/medicineData";
import CommonButton from "../common/CommonButton";
import MedicineCard from "../common/MedicineCard";
import Title from "../common/Title";
import { FaArrowRightLong } from "react-icons/fa6";

const FeaturedMedicines = () => {
  return (
    <div className="section-padding-x">
      <div className="flex flex-col lg:flex-row justify-between items-end">
        <div className="font-playfair">
          <Title level="title48" className="">
            Featured Peptides
          </Title>
          <Title
            level="title18"
            className="text-Secondary font-poppins max-w-3xl mx-auto"
          >
            Explore our top-selected peptides, chosen for quality, safety, and
            trusted results. Find reliable solutions for your research needs with
            confidence.
          </Title>
        </div>
        <CommonButton as="link" to="/catalog" className=" bg-Primary text-white font-poppins flex items-center gap-2">
          View all <FaArrowRightLong />
        </CommonButton>
      </div>
      <div className=" mt-12">
        <MedicineCard className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"/>
      </div>
    </div>
  );
};

export default FeaturedMedicines;
