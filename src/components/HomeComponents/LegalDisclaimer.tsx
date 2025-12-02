import legalDisclaimer from "@/assets/images/LegalDisclaimer.png";
import CommonButton from "../common/CommonButton";
import Title from "../common/Title";

const LegalDisclaimer = () => {
  return (
    <div className="section-padding-x section-padding-y w-full flex flex-col lg:flex-row items-center gap-10">

      {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={legalDisclaimer}
          alt="Legal Disclaimer"
          className="w-full max-w-md object-contain"
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="font-playfair">
          <Title level="title48" className="leading-snug">
            Legal Disclaimer
          </Title>

          <Title
            level="title18"
            className="text-Secondary font-poppins mt-4 leading-relaxed"
          >
            For research use only. Not intended for human or veterinary
            consumption, medical treatment, or diagnostic use. Buyer must be
            21+ and is solely responsible for proper handling and compliance
            with all applicable laws. By ordering, you confirm you are a
            qualified researcher and accept all risks. High Tide Peptides
            assumes no liability for misuse.
          </Title>
        </div>

        {/* Email Input + Button */}
  <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
  <div className="relative w-full">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 12.75 2.25 6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25"
        />
      </svg>
    </span>

    <input
      type="email"
      placeholder="Enter your email address"
      className="w-full border border-gray-300 rounded-xl px-12 py-3 text-sm 
      focus:border-Primary focus:ring-2 focus:ring-Primary/20 
      outline-none transition-all placeholder:text-gray-400"
    />
  </div>

  <CommonButton className="bg-Primary text-white font-poppins px-8 py-3 w-full sm:w-auto">
    Send
  </CommonButton>
</div>

      </div>
    </div>
  );
};

export default LegalDisclaimer;
