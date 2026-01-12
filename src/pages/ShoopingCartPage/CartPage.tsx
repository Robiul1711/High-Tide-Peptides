import CartItem from "../../components/CartComponent/CartItem";
import OrderSummary from "../../components/CartComponent/OrderSummary";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  /* ----------------------------------------
      GA4: REMOVE FROM CART HANDLER
  -----------------------------------------*/
  const handleRemoveItem = (item: any) => {
    // 1. Push GA4 Event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: "USD",
        value: item.price * item.quantity, // Value of items being removed
        items: [
          {
            item_id: String(item.id),
            item_name: item.title,
            price: item.price,
            quantity: item.quantity, // Quantity being removed
            item_category: "Medicine",
            google_business_vertical: "retail",
          },
        ],
      },
    });

    // 2. Perform actual removal
    removeFromCart(item.id);
  };

  return (
    <section>
      <div className="section-padding-x section-padding-y">
        <h1 className="text-xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-[#0E9FBA]">
            ({cart.length} Items)
          </span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/catalog" className="text-[#0E9FBA] underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Cart Items */}
            <div className="col-span-2 space-y-6">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => increaseQty(item.id)}
                  onDecrease={() => decreaseQty(item.id)}
                  // ✅ Use the new handler here
                  onRemove={() => handleRemoveItem(item)}
                />
              ))}

              <Link
                to="/catalog"
                className="text-[#0E9FBA] text-sm flex items-center gap-2"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Right: Order Summary */}
            <div className="col-span-2 sm:col-span-1">
              <OrderSummary subtotal={subtotal}  />
            </div>
          </div>
        )}
      </div>

      <LegalDisclaimer />
    </section>
  );
}