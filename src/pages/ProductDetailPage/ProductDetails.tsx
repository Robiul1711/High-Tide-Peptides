import { useState } from "react";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import Title from "../../components/common/Title";
import { CartSVG } from "../../components/svg/HomeSVG";
import { Link, useParams } from "react-router-dom";
import useClient from "../../hooks/useClient";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
export default function ProductDetails() {
  const { id } = useParams();
  const [qty, setQty] = useState(3);

const { data } = useClient({
  queryKey: ["product-details", id ?? ""], // FIXED
  url: `/products/product/${id ?? ""}`,
  isPrivate: false,
  enabled: !!id, // Do not run until id exists
});

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left — Product Image */}
          <div>
            <Zoom>

            <img
              src={data?.data?.product_image_url}
              alt="Peptides Crafted"
              className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-xl shadow-md"
            />
            </Zoom>
          </div>

          {/* Right — Product Info */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Research use only</p>

            <Title level="title32" className="font-playfair">
              {data?.data?.title}
            </Title>

            {/* Price */}
            <div className="flex items-center gap-3 mb-2">
              <p className="text-[#0E9FBA] text-2xl font-bold">
                {data?.data?.final_price}
              </p>
              <p className="text-gray-400 line-through">
                {data?.data?.start_price}
              </p>
            </div>

            <p className="text-[#5D5D5D] text-lg font-poppins  mb-6 max-w-md leading-relaxed">
              {data?.data?.subtitle}
            </p>

            {/* Quantity */}
            <h3 className="font-semibold mb-2">Quantity</h3>

            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="w-8 h-8 border rounded-lg flex items-center justify-center"
              >
                -
              </button>

              <span className="w-6 text-center">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 border rounded-lg flex items-center justify-center"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button className="bg-[#0E9FBA] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d8aa3] transition flex items-center">
                Add To Card <CartSVG className="ml-2" />
              </button>

              <Link
                to="/checkout"
                className="px-6 py-3 border border-[#0E9FBA] text-[#0E9FBA] rounded-lg font-medium hover:bg-[#0E9FBA] hover:text-white transition"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <Title level="title32" className="font-playfair">
            Description
          </Title>

          <p
            className="text-[#5D5D5D] text-lg font-poppins leading-relaxed max-w-4xl"
            dangerouslySetInnerHTML={{ __html: data?.data?.description }}
          ></p>
        </div>

        {/* Additional Information */}
        <div className="mt-10">
          <Title level="title32" className="font-playfair">
            Additional Information
          </Title>

          <div className="space-y-2">
            <div className="flex items-center gap-10">
              <p className="font-medium w-24">Color</p>
              <p className="text-gray-600">{data?.data?.color}</p>
            </div>

            <div className="flex items-center gap-10">
              <p className="font-medium w-24">Warranty</p>
              <p className="text-gray-600">{data?.data?.warranty}</p>
            </div>
          </div>
        </div>
      </div>
      <LegalDisclaimer />
    </section>
  );
}
