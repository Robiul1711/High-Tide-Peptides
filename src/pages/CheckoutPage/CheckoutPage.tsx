"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import Title from "../../components/common/Title";
import { useCart } from "../../context/CartContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

/* ================= TYPES ================= */
interface CheckoutForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  postal: string;
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const axiosPublic = useAxiosPublic();

  const SHIPPING_COST = 10;

  const [submittedData, setSubmittedData] = useState<CheckoutForm | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  /* ================= TOTALS ================= */
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const grandTotal = subTotal + SHIPPING_COST;

  /* ================= GA4: BEGIN CHECKOUT ================= */
  useEffect(() => {
    if (cart.length === 0) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "USD",
        value: grandTotal,
        items: cart.map((item, index) => ({
          item_id: String(item.id),
          item_name: item.title,
          price: item.price,
          quantity: item.quantity,
          index,
          item_category: "Medicine",
        })),
      },
    });
  }, [cart, grandTotal]);

  /* ================= MUTATION ================= */
  const checkoutMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosPublic.post(
        "transactions/product/checkout/invoice",
        formData,
        { responseType: "blob" }
      );
      return res.data;
    },
    onSuccess: (blob) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });

      const transactionId = `ORD-${Date.now()}`;

      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: transactionId,
          value: grandTotal,
          currency: "USD",
          tax: 0,
          shipping: SHIPPING_COST,
          items: cart.map((item, index) => ({
            item_id: String(item.id),
            item_name: item.title,
            price: item.price,
            quantity: item.quantity,
            index,
            item_category: "Medicine",
          })),
        },
        user_data: {
          email_address: submittedData?.email || "",
          first_name: submittedData?.first_name || "",
          last_name: submittedData?.last_name || "",
          city: submittedData?.city || "",
          postal_code: submittedData?.postal || "",
          state: submittedData?.state || "",
          phone_number: submittedData?.phone || "",
          country: "US",
        },
      });

      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice-${transactionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Order placed successfully");
      clearCart();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  /* ================= SUBMIT ================= */
  const onSubmit = (data: CheckoutForm) => {
    if (!cart.length) return;

    setSubmittedData(data);

    const formData = new FormData();

    cart.forEach((item, index) => {
      formData.append(`items[${index}][product_id]`, String(item.id));
      formData.append(`items[${index}][qty]`, String(item.quantity));
    });

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("postal", data.postal);
    formData.append("shipping", String(SHIPPING_COST));

    checkoutMutation.mutate(formData);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="section-padding-x section-padding-y">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Billing Address */}
            <div className="lg:col-span-2">
              <Title level="title32" className="pb-5">
                Billing Address
              </Title>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {[
                  { name: "first_name", label: "First Name" },
                  { name: "last_name", label: "Last Name" },
                  { name: "email", label: "Email" },
                  { name: "phone", label: "Phone Number" },
                  { name: "state", label: "State" },
                  { name: "city", label: "City" },
                  { name: "postal", label: "Zip / Postal Code" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-sm font-medium">{field.label}</label>
                    <input
                      {...register(field.name as keyof CheckoutForm, {
                        required: `${field.label} is required`,
                      })}
                      className="mt-1 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0E9FBA] outline-none"
                    />
                    {errors[field.name as keyof CheckoutForm] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.name as keyof CheckoutForm]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#F5FBFC] p-6 rounded-xl shadow-sm h-fit">
              <h3 className="text-base font-semibold mb-3">Your Order</h3>

              <div className="border-t">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-3 text-sm border-b"
                  >
                    <p>
                      {item.quantity} × {item.title}
                    </p>
                    <p className=" font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-3 text-sm">
                <p>Subtotal</p>
                <p>${subTotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between mt-2 text-sm">
                <p>Shipping</p>
                <p>$10.00</p>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-bold text-lg">
                <p>Grand Total</p>
                <p>${grandTotal.toFixed(2)}</p>
              </div>

              <button
                type="submit"
                disabled={checkoutMutation.isPending || !cart.length}
                className="w-full bg-[#0E9FBA] text-white py-3 rounded-lg mt-6 font-medium hover:bg-[#0d8aa3] transition disabled:bg-gray-400"
              >
                {checkoutMutation.isPending ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <LegalDisclaimer />
    </section>
  );
}
