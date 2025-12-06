import CommonButton from "./CommonButton";
import Title from "./Title";
import { CartSVG } from "../svg/HomeSVG";
import { Link } from "react-router-dom";
import useClient from "../../hooks/useClient";


const MedicineCard = () => {
      const { data } = useClient({
    queryKey: ["all-products"],
    url: "/products/get-all",
    isPrivate: false,
  });
console.log(data?.data)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {
        data?.data?.map((item : any,index: number)=>(

    <Link to={`/product/${item?.product_uid}`} key={index} className="p-4 border shadow rounded-2xl">
    <div className="w-full h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden rounded-lg">
  <img
    src={item?.product_image_url}
    alt={item?.title}
    className="w-full h-full object-cover"
  />
</div>


      <div className="flex justify-between items-center mt-4">
        <div>
          <Title level="title18" className="font-playfair">
            {item?.title}
          </Title>

          <div className="flex items-center gap-10">
            <Title
              level="title18"
              className="font-playfair text-[#4E97FD]"
            >
              ${item?.final_price?.toFixed(2)}
            </Title>

            <Title
              level="title18"
              className="font-playfair line-through text-gray-400"
            >
              ${item?.start_price?.toFixed(2)}
            </Title>
          </div>
        </div>

        <CommonButton className="bg-Primary text-white font-poppins p-2 rounded-lg">
          <CartSVG className="text-white" />
        </CommonButton>
      </div>
    </Link>
        ))
      }

    </div>
  );
};

export default MedicineCard;
