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
            <Link
              to="/catalogue"
              className="text-[#0E9FBA] underline"
            >
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
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}

              <Link
                to="/catalogue"
                className="text-[#0E9FBA] text-sm flex items-center gap-2"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Right: Order Summary */}
            <div className="col-span-2 sm:col-span-1">
            <OrderSummary subtotal={subtotal} shipping={0} />

            </div>
          </div>
        )}
      </div>

      <LegalDisclaimer />
    </section>
  );
}
