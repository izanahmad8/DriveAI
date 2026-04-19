import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { cars } from "../data";
import { formatPrice } from "../utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Models() {
  const { currency, modelFilter, highlightedCarId } = useAppContext();

  const filteredCars = useMemo(() => {
    let result = cars;
    if (modelFilter === "suv")
      result = result.filter((c) => c.type.toLowerCase().includes("suv"));
    if (modelFilter === "ev")
      result = result.filter((c) => c.type.toLowerCase().includes("ev"));
    if (modelFilter === "under40")
      result = result.filter((c) => c.price < 4000000);
    if (modelFilter === "family") result = result.filter((c) => c.seats >= 5);
    if (modelFilter === "autopilot") result = result.filter((c) => c.autopilot);
    return result;
  }, [modelFilter]);

  return (
    <section id="models" className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-4xl font-bold mb-12 text-center">Our Lineup</h2>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredCars.map((car) => (
            <motion.div
              key={car.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white/5 rounded-2xl overflow-hidden border transition-all duration-500 ${
                highlightedCarId === car.id
                  ? "border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.5)] scale-105"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">{car.name}</h3>
                  <span className="text-sm px-2 py-1 bg-white/10 rounded text-gray-300">
                    {car.type}
                  </span>
                </div>
                <p className="text-xl text-indigo-400 mb-4">
                  {formatPrice(car.price, car.priceUSD, currency)}
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-6">
                  {car.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                  <li>• {car.seats} Seats</li>
                </ul>
                <button
                  onClick={() => (window.location.hash = "#booking")}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl transition"
                >
                  Book Test Drive
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredCars.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-20">
            No model match your criteria.
          </div>
        )}
      </motion.div>
    </section>
  );
}
