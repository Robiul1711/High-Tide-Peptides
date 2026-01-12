import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import logo from "@/assets/images/logo.png";
import { CartSVG } from "../components/svg/HomeSVG";
import ResponsiveSearchbar from "./ResponsiveSearchbar";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const pathname = location.pathname;

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/catalog", text: "Catalog" },
    { href: "/contact", text: "Contact us" },
  ];

  /* Lock scroll for mobile menu */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-3 md:py-2">
        <div className="section-padding-x mx-auto flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center  space-x-8 ">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <div key={link.text} className="relative group">
                  <Link
                    to={link.href}
                    className={`text-base font-medium transition-colors ${
                      isActive
                        ? "text-Primary"
                        : "text-gray-600 dark:text-gray-300 hover:text-Primary"
                    }`}
                  >
                    {link.text}
                  </Link>

                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-Primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </div>
              );
            })}
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className=" flex items-center gap-2 md:gap-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <CartSVG />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= SEARCH MODAL ================= */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Modal */}
          <div className="fixed top-6 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4">
            <ResponsiveSearchbar onClose={() => setIsSearchOpen(false)} />
          </div>
        </>
      )}

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm z-50 bg-white dark:bg-gray-900
        shadow-xl transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "text-Primary bg-gray-100 dark:bg-gray-800"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
