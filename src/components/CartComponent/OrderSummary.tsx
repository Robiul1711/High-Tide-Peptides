import { Link } from "react-router-dom";

interface Props {
  subtotal: number;
}

export default function OrderSummary({ subtotal }: Props) {
  const shipping = 10; // ✅ fixed $10 shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-[#F5FBFC] rounded-xl p-6 shadow-sm w-full">
      <h3 className="text-lg font-semibold text-center mb-4">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <p>Sub total</p>
          <p className="font-semibold">${subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between">
          <p>Shipping</p>
          <p className="font-semibold">$10.00</p>
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-base">
          <p>Grand Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>

      <Link
        to="/checkout"
        className="mt-5 w-full bg-[#0E9FBA] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
      >
        Proceed To Checkout →
      </Link>

      <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
        <span>🔒</span>
        <p>Safe and Secure Payments, Easy Returns. 100% Authentic Products</p>
      </div>
    </div>
  );
}
