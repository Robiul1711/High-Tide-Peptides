"use client";

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
  state: string;
  city: string;
  postal: string;
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const axiosPublic = useAxiosPublic();

  /* ================= FORM ================= */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  /* ================= TOTAL ================= */
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= MUTATION ================= */
  const checkoutMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosPublic.post(
        "transactions/product/checkout/invoice",
        formData,
        {
          responseType: "blob", // ✅ VERY IMPORTANT (PDF)
        }
      );
      return res.data;
    },
    onSuccess: (blob) => {
      // ✅ Download PDF
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Order placed successfully");

      clearCart(); // ✅ empty cart after success
      
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  /* ================= SUBMIT ================= */
  const onSubmit = (data: CheckoutForm) => {
    if (!cart.length) return;

    const formData = new FormData();

    // ✅ items
    cart.forEach((item, index) => {
      formData.append(`items[${index}][product_id]`, String(item.id));
      formData.append(`items[${index}][qty]`, String(item.quantity));
    });
    
    // ✅ billing fields
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("postal", data.postal);

    checkoutMutation.mutate(formData);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="section-padding-x section-padding-y">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

            {/* ================= LEFT ================= */}
            <div className="lg:col-span-2">
              <Title level="title32" className="pb-5">
                Billing Address
              </Title>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {[
                  { name: "first_name", label: "First Name" },
                  { name: "last_name", label: "Last Name" },
                  { name: "email", label: "Email" },
                  { name: "state", label: "State" },
                  { name: "city", label: "City" },
                  { name: "postal", label: "Zip / Postal Code" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-sm font-medium">
                      {field.label}
                    </label>
                    <input
                      {...register(field.name as keyof CheckoutForm, {
                        required: `${field.label} is required`,
                      })}
                      className="mt-1 w-full border rounded-lg px-4 py-3"
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

            {/* ================= RIGHT ================= */}
            <div className="bg-[#F5FBFC] p-6 rounded-xl shadow-sm h-fit">
              <h3 className="text-base font-semibold mb-3">Item</h3>

              <div className="border-t">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-3 text-sm border-b"
                  >
                    <p>{item.quantity} × {item.title}</p>
                    <p className="text-[#0E9FBA] font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 font-semibold text-base">
                <p>Grand Total</p>
                <p>${grandTotal.toFixed(2)}</p>
              </div>

              <button
                type="submit"
                disabled={checkoutMutation.isPending || !cart.length}
                className="w-full bg-[#0E9FBA] text-white  py-2 sm:py-3 md:py-4 rounded-lg mt-6 font-medium"
              >
                {checkoutMutation.isPending
                  ? "Processing..."
                  : "Confirm Order"}
              </button>
            </div>

          </div>
        </div>
      </form>

      <LegalDisclaimer />
    </section>
  );
}
