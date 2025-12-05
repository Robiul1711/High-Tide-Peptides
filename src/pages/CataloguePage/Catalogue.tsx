import React from "react";
import FilterArea from "../../components/CatalogueComponent/FilterArea";
import MedicineCard from "../../components/common/MedicineCard";
import { medicineData } from "../../dummyData/medicineData";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";

const Catalogue = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section className="section-padding-y relative">
      {/* ===== Filter Button (Mobile + Desktop) ===== */}
      <div className="flex justify-end px-4 md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 bg-Primary text-white mb-5 rounded-md font-medium shadow-md hover:opacity-90 transition"
        >
          Filter
        </button>
      </div>

      {/* ===== Main Layout ===== */}
      <div className="section-padding-x flex w-full gap-6 lg:gap-10 ">
        {/* Sidebar (Desktop View) */}
        <div className="hidden md:block md:w-[20%]">
          <FilterArea />
        </div>

        {/* Products Area */}
        <div className="w-full md:w-[80%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicineData.map((item) => (
              <MedicineCard
                key={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                oldPrice={item.oldPrice}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== Mobile Filter Drawer ===== */}
      {isOpen && (
        <>
          {/* Background Blur Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
          ></div>

          {/* Slide-in Filter Panel */}
          <div
            className={`fixed top-0 left-0 h-full w-4/5 sm:w-[400px] bg-white shadow-xl z-50 p-6 mt-16 sm:mt-20 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Filter</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition text-lg font-medium"
              >
                ✕
              </button>
            </div>
            <FilterArea />
          </div>
        </>
      )}

      <div>
         <LegalDisclaimer />
      </div>
    </section>
  );
};

export default Catalogue;
