import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { CartSVG, UserSVG } from "../components/svg/HomeSVG";
import SimpleDropdown from "../components/common/SimpleDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/catalogue", text: "Catalogue" },
    { href: "/contact", text: "Contact us" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-3 sm:py-1">
        <div className="section-padding-x mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <div key={link.text} className="relative group">
                  <Link
                    to={link.href}
                    className={`text-sm sm:text-base md:text-lg font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-Primary"
                        : "text-gray-600 dark:text-gray-300 hover:text-Primary"
                    }`}
                  >
                    {link.text}
                  </Link>

                  {/* Underline Animation */}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-Primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center space-x-3">
              <p className="font-medium text-gray-600">United State</p>
              <span className="w-0.5 h-5 bg-gray-600"></span>
              <SimpleDropdown />
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <Link
                to="/cart"
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <CartSVG />
              </Link>
              <Link
                to="/auth/sign-up"
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <UserSVG />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              aria-label="Toggle menu"
            >
              <Menu
                className={`h-6 w-6 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                }`}
              />
              <X
                className={`h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm z-50 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 object-contain"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 p-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-base font-medium rounded-md transition
                    ${
                      pathname === link.href
                        ? "text-Primary bg-gray-100"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800"></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
