"use client";

import { useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import Title from "../../components/common/Title";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const orderItems = [
    { id: 1, name: "3 x Multivitamin Complex", price: 144.40 },
    { id: 2, name: "3 x Multivitamin Complex", price: 144.40 },
    { id: 3, name: "3 x Multivitamin Complex", price: 144.40 },
    { id: 4, name: "3 x Multivitamin Complex", price: 144.40 },
  ];

  const total = orderItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <section>
    <div className="section-padding-x section-padding-y">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Section */}
        <div className="lg:col-span-2">

            <Title level="title32" className="font-playfair pb-3 lg:pb-5">Billing Address</Title>

          {/* Grid Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input className="mt-1 w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input className="mt-1 w-full border rounded-lg px-4 py-3" />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input className="mt-1 w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="text-sm font-medium">State</label>
              <input className="mt-1 w-full border rounded-lg px-4 py-3" />
            </div>

            <div>
              <label className="text-sm font-medium">City</label>
              <input className="mt-1 w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="text-sm font-medium">Zip/postal code</label>
              <input className="mt-1 w-full border rounded-lg px-4 py-3" />
            </div>
          </div>

          {/* Payment Section */}
             <Title level="title32" className="font-playfair py-3 lg:py-5">Payment Method</Title>

          <div
            className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer w-fit"
            onClick={() => setPaymentMethod("stripe")}
          >
            <input
              type="radio"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
            />
            <span>Payment with Stripe</span>
            <FiCreditCard className="text-gray-400 text-lg" />
          </div>

          {/* Card number */}
          <div className="mt-6">
            <label className="text-sm font-medium">Card number</label>
            <input
              className="mt-2 w-full border rounded-lg px-4 py-3"
              placeholder="•••• •••• •••• ••••"
            />
          </div>

          {/* Expiration + CVV */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="text-sm font-medium">Expiration</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-3"
                placeholder="Month"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Year</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-3"
                placeholder="Year"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Security Code</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-3"
                placeholder="CVV"
              />
            </div>
          </div>

          {/* Terms */}
          <p className="text-center text-sm text-gray-500 mt-6">
            By clicking the button, you agree to the{" "}
            <span className="text-[#0E9FBA] cursor-pointer">
              Terms and Conditions
            </span>
          </p>

          {/* Button */}
          <button className="w-full bg-[#0E9FBA] text-white py-4 rounded-lg mt-6 text-center font-medium">
            Place Order Now
          </button>
        </div>

        {/* Right side summary */}
        <div className="bg-[#F5FBFC] p-6 rounded-xl shadow-sm h-fit">
          <h3 className="text-base font-semibold mb-3">Item</h3>

          <div className="border-t">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-3 text-sm border-b"
              >
                <p>{item.name}</p>
                <p className="text-[#0E9FBA] font-semibold">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 font-semibold text-base">
            <p>Grand Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  <LegalDisclaimer />
    </section>
  );
}
