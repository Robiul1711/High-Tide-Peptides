import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { GoLinkExternal } from "react-icons/go";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../hooks/useAxiosPublic";
import { useDebounce } from "../hooks/useDebounce";


/* ================= TYPES ================= */
interface Product {
  id: number | string;
  title: string;
  product_image_url: string;
}

interface ApiResponse {
  status: boolean;
  data: {
    data: Product[];
  };
}

interface ResponsiveSearchbarProps {
  onClose: () => void;
}

const ResponsiveSearchbar: React.FC<ResponsiveSearchbarProps> = ({ onClose }) => {
  const [inputText, setInputText] = useState("");
  const debouncedSearch = useDebounce(inputText, 400);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const axiosPublic = useAxiosPublic();

  /* ================= SEARCH QUERY ================= */
  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["search-products", debouncedSearch],
    enabled: !!debouncedSearch.trim(),
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products/search?name=${debouncedSearch}`
      );
      return res.data;
    },
  });

  const products = data?.data?.data ?? [];

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  /* ================= HELPERS ================= */
  const truncate = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + "...";

  /* ================= UI ================= */
  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white dark:bg-slate-900 rounded-xl shadow-xl p-4"
    >
      {/* Input */}
      <div className="relative">
        <IoIosSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-gray-400 dark:text-slate-500" />
        <input
          autoFocus
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Search products..."
          className="
            w-full pl-10 pr-4 py-2 rounded-lg
            border border-gray-300 dark:border-slate-700
            bg-white dark:bg-slate-900
            text-gray-800 dark:text-[#abc2d3]
            placeholder:text-gray-400 dark:placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-Primary
          "
        />
      </div>

      {/* Results */}
      <div className="mt-3 max-h-[320px] overflow-y-auto">
        {isLoading && (
          <p className="py-4 text-center text-sm text-gray-400">
            Searching...
          </p>
        )}

        {!isLoading && products.length > 0 &&
          products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={onClose}
              className="
                flex items-center justify-between gap-3
                px-4 py-3 rounded-lg
                hover:bg-gray-100 dark:hover:bg-slate-800/60
                transition
              "
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.product_image_url}
                  alt={product.title}
                  className="w-9 h-9 rounded object-cover"
                />
                <p className="text-sm sm:text-base text-gray-700 dark:text-[#abc2d3]">
                  {truncate(product.title, 50)}
                </p>
              </div>
              <GoLinkExternal className="text-lg text-gray-400 dark:text-slate-500" />
            </Link>
          ))}

        {!isLoading && debouncedSearch && products.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-400 dark:text-slate-500">
            No matching products found
          </p>
        )}
      </div>
    </div>
  );
};

export default ResponsiveSearchbar;
