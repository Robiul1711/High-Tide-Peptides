import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FilterAreaProps {
  onFilterChange: (params: any) => void;
  onClearFilters: () => void;
}

const FilterArea = ({ onFilterChange, onClearFilters }: FilterAreaProps) => {
  // ----------------------------
  // FILTER STATE
  // ----------------------------
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("Featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // ----------------------------
  // UI OPTIONS
  // ----------------------------
  const stockOptions = ["In Stock", "Out of Stock"];

  const sortOptions = [
    "Featured",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date, old to new",
    "Date, new to old",
  ];

  // Mapping UI → API format
  const sortMapping: any = {
    Featured: null,
    "Alphabetically, A-Z": "alpha_asc",
    "Alphabetically, Z-A": "alpha_desc",
    "Price, low to high": "price_asc",
    "Price, high to low": "price_desc",
    "Date, old to new": "date_asc",
    "Date, new to old": "date_desc",
  };

  // ----------------------------
  // HANDLERS
  // ----------------------------
  const handleStockToggle = (stock: string) => {
    setSelectedStocks((prev) =>
      prev.includes(stock)
        ? prev.filter((s) => s !== stock)
        : [...prev, stock]
    );
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const handleClear = () => {
    setSelectedStocks([]);
    setSelectedSort("Featured");
    setPriceRange([0, 500]);
    onClearFilters();
  };

  // ----------------------------
  // APPLY FILTERS
  // ----------------------------
  const handleApply = () => {
    const stockValue = selectedStocks.includes("In Stock")
      ? "in_stock"
      : selectedStocks.includes("Out of Stock")
      ? "out_stock"
      : null;

    const sortValue = sortMapping[selectedSort];

    const params = {
      stock: stockValue,
      low: priceRange[0],
      high: priceRange[1],
      sort: sortValue,
    };

    console.log("APPLIED FILTERS:", params);
    onFilterChange(params);
  };

  // ----------------------------
  // UI RENDER
  // ----------------------------
  return (
    <div className="w-full max-w-sm bg-white md:rounded-2xl md:p-6 md:shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <IoFilterSharp />
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        </div>
        <button
          onClick={handleClear}
          className="text-Primary hover:text-teal-600 font-medium text-sm"
        >
          Clear
        </button>
      </div>

      {/* STOCK FILTER */}
      <div className="mb-8">
        <h3 className="text-gray-800 font-semibold mb-4 text-sm">Stock</h3>
        <div className="space-y-3">
          {stockOptions.map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStocks.includes(item)}
                onChange={() => handleStockToggle(item)}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="mb-8">
        <h3 className="text-gray-800 font-semibold mb-4 text-sm">Price Range</h3>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={500}
            step={1}
            value={priceRange}
            onChange={handlePriceChange}
            trackStyle={[{ backgroundColor: "#009EB4", height: 6 }]}
            handleStyle={[
              {
                borderColor: "#009EB4",
                height: 18,
                width: 18,
                marginTop: -6,
                backgroundColor: "#009EB4",
              },
              {
                borderColor: "#009EB4",
                height: 18,
                width: 18,
                marginTop: -6,
                backgroundColor: "#009EB4",
              },
            ]}
            railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* SORT */}
      <div className="mb-8">
        <h3 className="text-gray-800 font-semibold mb-4 text-sm">Sort</h3>
        <div className="space-y-3">
          {sortOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={selectedSort === option}
                onChange={() => setSelectedSort(option)}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-gray-700 text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApply}
        className="w-full bg-Primary hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterArea;