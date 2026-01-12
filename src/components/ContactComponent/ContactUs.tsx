"use client";

import { useForm } from "react-hook-form";
import Title from "../common/Title";
import useMutationClient from "../../hooks/useMutationClient";
import { Helmet } from "react-helmet-async";

interface ContactFormTypes {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormTypes>();

  // POST /forms/contact/store
  const ContactPost = useMutationClient({
    url: "/forms/contact/store",
    method: "post",
    isPrivate: false,
    successMessage: "Message sent successfully!",
  });

  const onSubmit = async (data: ContactFormTypes) => {
    try {
      await ContactPost.mutateAsync({ data });
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
       {/* ========== SEO for Contact Page ========== */}
            <Helmet>
              <title>Contact Us | Peptide Support & Inquiries</title>
      
              <meta
                name="description"
                content="Get in touch with our support team for peptide inquiries, order assistance, and research product questions. We're here to help with fast and reliable customer service."
              />
      
              <meta 
                property="og:title" 
                content="Contact Us | Peptide Support & Inquiries" 
              />
              <meta
                property="og:description"
                content="Reach out to our team for questions about research peptides, orders, shipping, or product details. Fast and reliable customer support."
              />
      
              <meta property="og:type" content="website" />
            </Helmet>
            {/* =========================================== */}
      {/* Title */}
      <Title level="title32" className="text-center font-playfair">
        Contact Us
      </Title>

      <p className="text-sm sm:text-base lg:text-lg text-center text-gray-500 mb-10 max-w-2xl mx-auto">
    Have a question or need support? We’re here to help.
  Feel free to reach out to us anytime, and our team will get back to you as soon as possible.
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* NAME */}
        <div>
          <label className="text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name..."
            className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 
            focus:ring-Primary/20 focus:border-Primary transition-all"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            })}
            placeholder="Enter your email..."
            className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 
            focus:ring-Primary/20 focus:border-Primary transition-all"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm font-medium">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Enter your Number"
            className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 
            focus:ring-Primary/20 focus:border-Primary transition-all"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <label className="text-sm font-medium">Comments</label>
          <textarea
            {...register("message")}
            placeholder="Comments"
            rows={4}
            className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 
            focus:ring-Primary/20 focus:border-Primary transition-all"
          ></textarea>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={ContactPost.isPending}
          className={`w-full bg-Primary text-white py-3 rounded-xl font-medium transition-all ${
            ContactPost.isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-cyan-700"
          }`}
        >
          {ContactPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
