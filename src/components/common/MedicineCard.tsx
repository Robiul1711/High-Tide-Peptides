import CommonButton from "./CommonButton";
import Title from "./Title";
import { CartSVG } from "../svg/HomeSVG";
import { Link } from "react-router-dom";

interface MedicineCardProps {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
}

const MedicineCard = ({ image, title, price, oldPrice }: MedicineCardProps) => {
  return (
    <Link to={`/product/${title}`} className="p-4 border shadow rounded-2xl">
      <img src={image} alt={title} className="w-full object-cover rounded-lg" />

      <div className="flex justify-between items-center mt-4">
        <div>
          <Title level="title18" className="font-playfair">
            {title}
          </Title>

          <div className="flex items-center gap-10">
            <Title
              level="title18"
              className="font-playfair text-[#4E97FD]"
            >
              ${price.toFixed(2)}
            </Title>

            <Title
              level="title18"
              className="font-playfair line-through text-gray-400"
            >
              ${oldPrice.toFixed(2)}
            </Title>
          </div>
        </div>

        <CommonButton className="bg-Primary text-white font-poppins p-2 rounded-lg">
          <CartSVG className="text-white" />
        </CommonButton>
      </div>
    </Link>
  );
};

export default MedicineCard;
