"use client";

import { useForm } from "react-hook-form";
import Title from "../common/Title";

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

  const onSubmit = (data: ContactFormTypes) => {
    console.log("Contact Form Submitted:", data);
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Title */}
      <Title level="title32" className="text-center font-playfair">
        Contact Us
      </Title>

      {/* Short Description */}
      <p className="text-sm sm:text-base  lg:text-lg text-center text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet consectetur. Nunc ipsum tincidunt dictum
        donec dui in cursus risus. Nunc lacus egestas ipsum dictumst volutpat
        sed sed diam tincidunt. Amet adipiscing molestie amet cum varius egestas
        sem tellus.
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
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
          className="w-full bg-Primary text-white py-3 rounded-xl font-medium hover:bg-cyan-700 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
