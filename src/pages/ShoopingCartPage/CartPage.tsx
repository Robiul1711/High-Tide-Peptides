import { useState } from "react";
import type { CartItemType } from "../../types.cart";
import CartItem from "../../components/CartComponent/CartItem";
import OrderSummary from "../../components/CartComponent/OrderSummary";
import peptide from "../../assets/images/peptide.png";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([
    {
      id: "1",
      title: "Peptides Crafted",
      subtitle: "BPC-157 20mg",
      price: 20,
      quantity: 3,
      image: peptide,
    },
    {
      id: "2",
      title: "Peptides Crafted",
      subtitle: "BPC-157 20mg",
      price: 20,
      quantity: 3,
      image: peptide,
    },
    {
      id: "3",
      title: "Peptides Crafted",
      subtitle: "BPC-157 20mg",
      price: 20,
      quantity: 3,
      image: peptide,
    },
    {
      id: "4",
      title: "Peptides Crafted",
      subtitle: "BPC-157 20mg",
      price: 20,
      quantity: 3,
      image: peptide,
    },
    {
      id: "5",
      title: "Peptides Crafted",
      subtitle: "BPC-157 20mg",
      price: 20,
      quantity: 3,
      image: peptide,
    },
    {
      id: "6",
      title: "Peptides Crafted",
      subtitle: "BPC-157 20mg",
      price: 20,
      quantity: 3,
      image: peptide,
    },
  ]);

  const increase = (id: string) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  const decrease = (id: string) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      )
    );

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section>
      <div className="section-padding-x section-padding-y">
        <h1 className="text-xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-[#0E9FBA]">({items.length} Items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Cart Items */}
          <div className="col-span-2">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={remove}
              />
            ))}

            <Link to="/catalogue" className="mt-6 text-[#0E9FBA] text-sm flex items-center gap-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* Right: Order Summary */}
          <OrderSummary subtotal={subtotal} shipping={8} />
        </div>
      </div>
      <LegalDisclaimer />
    </section>
  );
}
