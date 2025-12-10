import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0097A7] text-white section-padding-x py-10">
      <div className="">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* LEFT: Logo + Disclaimer */}
          <div className="flex flex-col gap-4 max-w-md">
            <img src={logo} alt="logo" className="w-20 h-20 object-contain" />

            <p className="text-sm sm:text-base leading-relaxed">
              All items are sold strictly for laboratory research use only.  
              Not for human or animal consumption.
            </p>
          </div>

          {/* RIGHT: NAV LINKS */}
          <div className="flex flex-row  items-start md:items-end gap-6 md:gap-3 lg:gap-10 text-sm sm:text-base">
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
            <Link to="/catalogue" className="hover:text-gray-200 transition">Catalogue</Link>
            <Link to="/contact" className="hover:text-gray-200 transition">Contact US</Link>
          </div>
        </div>

        {/* DIVIDER LINE */}
        <div className="w-full h-px bg-white/30 my-6"></div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

          {/* LEFT COPYRIGHT */}
          <p className="text-center md:text-left text-sm">
            © 2025 CardVault. All rights reserved.
          </p>

          {/* RIGHT POLICY LINKS */}
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-gray-200 transition">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gray-200 transition">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-gray-200 transition">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
