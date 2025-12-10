import { useEffect, useState } from "react";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import Title from "../../components/common/Title";
import { CartSVG } from "../../components/svg/HomeSVG";
import { Link, useParams } from "react-router-dom";
import useClient from "../../hooks/useClient";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();

  const [qty, setQty] = useState(1);

  const { data } = useClient({
    queryKey: ["product-details", id ?? ""],
    url: `/products/product/${id ?? ""}`,
    isPrivate: false,
    enabled: !!id,
  });

  const product = data?.data;

  /* ✅ find product in cart */
  const cartItem = cart.find((item) => item.id === product?.id);

  /* ✅ sync qty with cart quantity */
  useEffect(() => {
    if (cartItem) {
      setQty(cartItem.quantity);
    } else {
      setQty(1);
    }
  }, [cartItem]);

  /* ✅ add only missing quantity */
  const handleAddToCart = () => {
    if (!product) return;

    const currentQty = cartItem?.quantity ?? 0;
    const diff = qty - currentQty;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.final_price,
          image: product.product_image_url,
        });
      }
    }
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Image */}
          <div>
            <Zoom>
              <img
                src={product?.product_image_url}
                alt={product?.title}
                className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-xl shadow-md"
              />
            </Zoom>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Research use only</p>

            <Title level="title32">{product?.title}</Title>

            {/* Price */}
            <div className="flex items-center gap-3 mb-2">
              <p className="text-[#0E9FBA] text-2xl font-bold">
                ${product?.final_price}
              </p>
              <p className="text-gray-400 line-through">
                ${product?.start_price}
              </p>
            </div>

            <p className="text-[#5D5D5D] text-lg mb-6">
              {product?.subtitle}
            </p>

            {/* Quantity */}
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border rounded-lg"
              >
                -
              </button>

              {/* ✅ THIS NOW SHOWS CART QUANTITY */}
              <span className="w-6 text-center">{qty}</span>

              <button
                disabled={qty >= product?.stock}
                onClick={() =>
                  setQty((q) =>
                    product?.stock ? Math.min(product.stock, q + 1) : q + 1
                  )
                }
                className={`w-8 h-8 border rounded-lg ${
                  qty >= product?.stock ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                disabled={product?.stock <= 0}
                onClick={handleAddToCart}
                className={`
                  flex items-center px-6 py-2 sm:py-3 rounded-lg font-medium transition
                  ${
                    product?.stock <= 0
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#0E9FBA] text-white hover:bg-[#0d8aa3]"
                  }
                `}
              >
                {cartItem ? "Update Cart" : "Add To Cart"}
                <CartSVG className="ml-2" />
              </button>

              <Link
                to={product?.stock > 0 ? "/cart" : "#"}
                onClick={(e) => {
                  if (product?.stock <= 0) e.preventDefault();
                }}
                className={`
                  px-6 py-2 sm:py-3 rounded-lg font-medium transition border
                  ${
                    product?.stock <= 0
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "border-[#0E9FBA] text-[#0E9FBA] hover:bg-[#0E9FBA] hover:text-white"
                  }
                `}
              >
                Buy Now
              </Link>
            </div>

            {/* ✅ Info message */}
            {cartItem && (
              <p className="mt-3 text-sm text-green-600">
                ✔ Already in cart ({cartItem.quantity})
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <Title level="title32">Description</Title>
          <div
            className="text-[#5D5D5D] text-lg max-w-4xl"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          />
        </div>
      </div>

      <LegalDisclaimer />
    </section>
  );
}
