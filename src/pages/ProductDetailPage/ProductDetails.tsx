import { useState } from "react";
import peptide from "../../assets/images/peptide.png";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import Title from "../../components/common/Title";
import { CartSVG } from "../../components/svg/HomeSVG";
import { Link } from "react-router-dom";
export default function ProductDetails() {
  const [qty, setQty] = useState(3);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left — Product Image */}
          <div>
            <img
              src={peptide}
              alt="Peptides Crafted"
              className="w-full rounded-xl shadow-md object-contain"
            />
          </div>

          {/* Right — Product Info */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Research use only</p>

            <Title level="title32" className="font-playfair">
              Peptides Crafted
            </Title>

            {/* Price */}
            <div className="flex items-center gap-3 mb-2">
              <p className="text-[#0E9FBA] text-2xl font-bold">$20.00</p>
              <p className="text-gray-400 line-through">$20.00</p>
            </div>

            <p className="text-gray-600 text-sm mb-6 max-w-md leading-relaxed">
              research use only, suitable for scientific studies, lab testing,
              and biochemical experiments
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

              <Link to="/checkout" className="px-6 py-3 border border-[#0E9FBA] text-[#0E9FBA] rounded-lg font-medium hover:bg-[#0E9FBA] hover:text-white transition">
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

          <p className="text-gray-600 leading-relaxed max-w-4xl">
            These peptides are strictly intended for research purposes only.
            They are designed for use in scientific studies, laboratory testing,
            academic research, and controlled biochemical experiments. These
            products are not reviewed or approved by any regulatory authority
            for medical, diagnostic, or therapeutic use. They must not be
            consumed, injected, or administered to humans or animals under any
            circumstances. Proper laboratory safety protocols, handling
            procedures, and storage guidelines should always be followed when
            working with these research-grade materials.
          </p>
        </div>

        {/* Additional Information */}
        <div className="mt-10">
          <Title level="title32" className="font-playfair">
            Additional Information
          </Title>

          <div className="space-y-2">
            <div className="flex items-center gap-10">
              <p className="font-medium w-24">Color</p>
              <p className="text-gray-600">White, black</p>
            </div>

            <div className="flex items-center gap-10">
              <p className="font-medium w-24">Warranty</p>
              <p className="text-gray-600">5 years</p>
            </div>
          </div>
        </div>
      </div>
      <LegalDisclaimer />
    </section>
  );
}
