import CommonButton from "./CommonButton";
import Title from "./Title";
import { CartSVG } from "../svg/HomeSVG";
import { Link } from "react-router-dom";
import useClient from "../../hooks/useClient";

interface MedicineCardProps {
  className?: string;
  filterParams?: any;
  applyFilters?: boolean;
}

const MedicineCard = ({ 
  className, 
  filterParams = {}, 
  applyFilters = false 
}: MedicineCardProps) => {
  
  // Conditionally fetch based on whether filters are applied
  const { data, isLoading, isError } = useClient({
    queryKey: ["products", filterParams],
    url: "/products/filter/get-all",
    params: applyFilters ? filterParams : {},
    isPrivate: false,
  });

  console.log("API Response:", data);

  if (isLoading) {
    return (
      <div className={`${className} flex justify-center items-center`}>
        <div className="text-Primary">Loading products...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${className} flex justify-center items-center `}>
        <div className="text-red-500">Error loading products</div>
      </div>
    );
  }

  // If no data or empty array
  if (!data?.data || data.data.length === 0) {
    return (
      <div className={`${className} flex justify-center items-center h-64`}>
        <div className="text-gray-500 text-center">
          <p className="text-lg font-semibold mb-2">No products found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {data.data.map((item: any, index: number) => {
        const isOutOfStock = item?.stock === 0;
        
        return (
          <Link
            to={`/product/${item?.id}`}
            key={index}
            className={`p-4 border shadow rounded-2xl hover:shadow-lg transition-shadow duration-300 ${
              isOutOfStock ? 'opacity-80' : ''
            }`}
          >
            <div className="w-full h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden rounded-lg">
              <img
                src={item?.product_image_url}
                alt={item?.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300x400?text=No+Image";
                }}
              />
            </div>

            <div className="flex justify-between items-center gap-2 mt-4">
              <div className="flex-1">
                <Title level="title18" className="font-playfair line-clamp-1">
                  {item?.title}
                </Title>

                <div className="flex items-center gap-4 mt-2">
                  <Title level="title18" className="font-playfair text-[#4E97FD]">
                    ${item?.final_price?.toFixed(2)}
                  </Title>

                  {item?.start_price && item.start_price > item.final_price && (
                    <Title
                      level="title18"
                      className="font-playfair line-through text-gray-400"
                    >
                      ${item?.start_price?.toFixed(2)}
                    </Title>
                  )}
                </div>
                
                {/* Stock Status */}
                <div className="mt-2">
                  <span className={`text-sm px-2 py-1 rounded ${
                    isOutOfStock 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                    {!isOutOfStock && item?.stock > 0 && ` (${item?.stock})`}
                  </span>
                </div>
              </div>

              {/* Show cart button only if NOT out of stock */}
              {!isOutOfStock && (
                <CommonButton 
                  className="bg-Primary hover:bg-teal-600 text-white font-poppins p-3 rounded-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic here
                    console.log("Add to cart:", item.id);
                  }}
                >
                  <CartSVG className="text-white w-5 h-5" />
                </CommonButton>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MedicineCard;