import { useEffect } from "react";
import CommonButton from "./CommonButton";
import Title from "./Title";
import { CartSVG } from "../svg/HomeSVG";
import { Link } from "react-router-dom";
import useClient from "../../hooks/useClient";
import { useCart } from "../../context/CartContext";
import PageLoader from "./PageLoader";

interface MedicineCardProps {
  className?: string;
  filterParams?: any;
  applyFilters?: boolean;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const MedicineCard = ({
  className,
  filterParams = {},
  applyFilters = false,
}: MedicineCardProps) => {
  const { addToCart } = useCart();
  const { data, isLoading, isError } = useClient({
    queryKey: ["products", filterParams],
    url: "/products/filter/get-all",
    params: applyFilters ? filterParams : {},
    isPrivate: false,
  });
  // console.log(data)
  /* ----------------------------------------
     GA4: VIEW ITEM LIST (Using dataLayer)
  -----------------------------------------*/
  useEffect(() => {
    if (!data?.data?.data?.length) return;

    // Initialize dataLayer if it doesn't exist yet
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object (GA4 best practice)
    window.dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        item_list_name: "Medicine Products",
        items: data.data.map((item: any, index: number) => ({
          item_id: item.id,
          item_name: item.title,
          price: item.final_price,
          index,
          item_category: "Medicine",
          google_business_vertical: "retail",
        })),
      },
    });
  }, [data]);

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <div className={`${className} flex justify-center items-center`}>
        <div className="text-red-500">Error loading products</div>
      </div>
    );
  }

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
    <div>
      <div className={className}>
        {data.data.map((item: any) => {
          const isOutOfStock = item?.stock === 0;
          return (
            <Link
              to={`/product/${item?.id}`}
              key={item.id}
              className={`p-4 border shadow rounded-2xl hover:shadow-lg transition-shadow duration-300 ${
                isOutOfStock ? "opacity-80" : ""
              }`}
            >
              {/* IMAGE */}
              <div className="w-full h-96 sm:h-100 overflow-hidden rounded-lg">
                <img
                  src={item?.product_image_url}
                  alt={item?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x400?text=No+Image";
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="flex justify-between items-center gap-2 mt-4">
                <div className="flex-1">
                  <Title level="title18" className="font-playfair line-clamp-1">
                    {item?.title}
                  </Title>

                  {/* PRICE */}
                  <div className="flex items-center gap-4 mt-2">
                    <Title
                      level="title18"
                      className="font-playfair text-[#4E97FD]"
                    >
                      ${item?.final_price?.toFixed(2)}
                    </Title>
                    {item?.start_price &&
                      item.start_price > item.final_price && (
                        <Title
                          level="title18"
                          className="font-playfair line-through text-gray-400"
                        >
                          ${item?.start_price?.toFixed(2)}
                        </Title>
                      )}
                  </div>

                  {/* STOCK */}
                  <div className="mt-2">
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        isOutOfStock
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {isOutOfStock ? "Out of Stock" : "In Stock"}
                      {!isOutOfStock && item?.stock > 0 && ` (${item?.stock})`}
                    </span>
                  </div>
                </div>

                {/* ADD TO CART */}
                {!isOutOfStock && (
                  <CommonButton
                    className="bg-Primary hover:bg-teal-600 text-white font-poppins p-3 rounded-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.final_price,
                        image: item.product_image_url,
                      });

                      /* GA4: ADD TO CART via DataLayer */
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({ ecommerce: null });
                      window.dataLayer.push({
                        event: "add_to_cart",
                        ecommerce: {
                          currency: "USD",
                          value: item.final_price,
                          items: [
                            {
                              item_id: item.id,
                              item_name: item.title,
                              price: item.final_price,
                              quantity: 1,
                              item_category: "Medicine",
                              google_business_vertical: "retail",
                            },
                          ],
                        },
                      });
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
      {/* <div className="flex justify-center mt-12">pagination</div> */}
    </div>
  );
};

export default MedicineCard;
