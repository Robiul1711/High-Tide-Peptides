import { useEffect, useState } from "react";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import Title from "../../components/common/Title";
import { CartSVG } from "../../components/svg/HomeSVG";
import { Link, useParams } from "react-router-dom";
import useClient from "../../hooks/useClient";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useCart } from "../../context/CartContext";
import { Helmet } from "react-helmet-async";

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
  const cartItem = cart.find((item) => item.id === product?.id);

  // Calculate subtotal for the view_cart event
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  /* ✅ Sync qty with cart quantity */
  useEffect(() => {
    if (cartItem) {
      setQty(cartItem.quantity);
    } else {
      setQty(1);
    }
  }, [cartItem]);

  /* -----------------------------------------------------------
     GA4: VIEW_ITEM EVENT (Fires when product data loads)
  ----------------------------------------------------------- */
  useEffect(() => {
    if (product) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object
      window.dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "USD",
          value: product.final_price,
          items: [{
            item_id: String(product.id),
            item_name: product.title,
            price: product.final_price,
            item_category: "Medicine",
            quantity: 1
          }]
        }
      });
    }
  }, [product]);

  /* -----------------------------------------------------------
     GA4: VIEW_CART EVENT (Fires when cart changes)
  ----------------------------------------------------------- */
  useEffect(() => {
    if (cart.length === 0) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: "view_cart",
      ecommerce: {
        currency: "USD",
        value: subtotal,
        items: cart.map((item, index) => ({
          item_id: String(item.id),
          item_name: item.title,
          price: item.price,
          quantity: item.quantity,
          index: index,
          item_category: "Medicine",
        })),
      },
    });
  }, [cart, subtotal]);

  /* ✅ Add logic + GA4 ADD_TO_CART */
  const handleAddToCart = () => {
    if (!product) return;

    const currentQty = cartItem?.quantity ?? 0;
    const diff = qty - currentQty;

    if (diff > 0) {
      // FIRE GA4 EVENT
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "USD",
          value: product.final_price * diff,
          items: [{
            item_id: String(product.id),
            item_name: product.title,
            price: product.final_price,
            item_category: "Medicine",
            quantity: diff
          }]
        }
      });

      // ADD TO STATE
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
      <Helmet key={product?.id}>
        <title>{(product?.title || "Product Details") + " | Premium Research Peptide"}</title>
        <meta name="description" content={product?.description || "High-purity research peptide."} />
        <meta property="og:title" content={(product?.title || "Product Details") + " | Research Peptide"} />
        <meta property="og:type" content="product" />
        {product?.product_image_url && <meta property="og:image" content={product.product_image_url} />}
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="relative group cursor-zoom-in">
            <Zoom>
              <img
                src={product?.product_image_url}
                alt={product?.title}
                className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover rounded-xl shadow-md"
              />
            </Zoom>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              🔍 <span>Click to Zoom</span>
            </div>
          </div>

          {/* Info Section */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Research use only</p>
            <Title level="title32">{product?.title}</Title>

            <div className="flex items-center gap-3 mb-2">
              <p className="text-[#0E9FBA] text-2xl font-bold">${product?.final_price}</p>
              <p className="text-gray-400 line-through">${product?.start_price}</p>
            </div>

            <p className="text-[#5D5D5D] text-lg mb-6">{product?.subtitle}</p>

            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border rounded-lg"
              >
                -
              </button>
              <span className="w-6 text-center">{qty}</span>
              <button
                disabled={qty >= product?.stock}
                onClick={() => setQty((q) => (product?.stock ? Math.min(product.stock, q + 1) : q + 1))}
                className={`w-8 h-8 border rounded-lg ${qty >= product?.stock ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                disabled={product?.stock <= 0}
                onClick={handleAddToCart}
                className={`flex items-center px-6 py-2 sm:py-3 rounded-lg font-medium transition ${
                  product?.stock <= 0 ? "bg-gray-400 cursor-not-allowed text-white" : "bg-[#0E9FBA] text-white hover:bg-[#0d8aa3]"
                }`}
              >
                {cartItem ? "Update Cart" : "Add To Cart"}
                <CartSVG className="ml-2" />
              </button>

              <Link
                to={product?.stock > 0 ? "/cart" : "#"}
                onClick={(e) => product?.stock <= 0 && e.preventDefault()}
                className={`px-6 py-2 sm:py-3 rounded-lg font-medium transition border ${
                  product?.stock <= 0 ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed" : "border-[#0E9FBA] text-[#0E9FBA] hover:bg-[#0E9FBA] hover:text-white"
                }`}
              >
                Buy Now
              </Link>
            </div>

            {cartItem && (
              <p className="mt-3 text-sm text-green-600">
                ✔ Already in cart ({cartItem.quantity})
              </p>
            )}
          </div>
        </div>

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