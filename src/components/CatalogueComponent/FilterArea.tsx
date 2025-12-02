import { useState } from "react";
import { X } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterArea = () => {
  const categories = [
    "In Stock (100)",
    "Out of Stock (10)",

  ];
  const filterandsort = [
    "Featured",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date, old to new",
    "Date, new to old",


  ];


  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [instantDeliveryOnly, setInstantDeliveryOnly] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleRatingToggle = (ratingId) => {
    setSelectedRating(selectedRating === ratingId ? null : ratingId);
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setPriceRange([0, 20000]);
    setInstantDeliveryOnly(false);
    setSelectedRating(null);
  };

  const handleApply = () => {
    const filterData = {
      categories: selectedCategories,
      priceRange: {
        min: priceRange[0],
        max: priceRange[1],
      },
      instantDeliveryOnly,
      minimumRating: selectedRating,
    };
    console.log("Applied Filters:", filterData);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="w-full max-w-sm bg-white md:rounded-2xl md:p-6 md:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <X className="h-5 w-5 text-gray-700" strokeWidth={3} />
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        </div>
        <button
          onClick={handleClear}
          className="text-Primary hover:text-teal-600 font-medium text-sm"
        >
          Clear
        </button>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-gray-800 font-semibold mb-4 text-sm">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-teal-500 cursor-pointer accent-teal-500"
              />
              <span className="text-gray-700 text-sm group-hover:text-gray-900">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-8">
        <h3 className="text-gray-800 font-semibold mb-4 text-sm">
          Price Range
        </h3>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={20000}
            step={100}
            value={priceRange}
            onChange={(value) => handlePriceChange(value)}
            trackStyle={[{ backgroundColor: "#009EB4 ", height: 6 }]}
            handleStyle={[
              {
                borderColor: "#009EB4 ",
                height: 18,
                width: 18,
                marginTop: -6,
                backgroundColor: "#009EB4 ",
              },
              {
                borderColor: "#009EB4 ",
                height: 18,
                width: 18,
                marginTop: -6,
                backgroundColor: "#009EB4 ",
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

      {/* filter and sort Section */}
      <div className="mb-8">
        <h3 className="text-gray-800 font-semibold mb-4 text-sm">Filter & Sort</h3>
        <div className="space-y-3">
          {filterandsort.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-teal-500 cursor-pointer accent-teal-500"
              />
              <span className="text-gray-700 text-sm group-hover:text-gray-900">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>



      {/* Apply Button */}
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
