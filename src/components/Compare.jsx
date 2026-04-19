import React from 'react';
import { useAppContext } from '../context/AppContext';
import { cars } from '../data';
import { formatPrice } from '../utils';

export default function Compare() {
  const { compareModels, currency } = useAppContext();
  
  const models = compareModels.map(id => cars.find(c => c.id === id)).filter(Boolean);

  if (models.length < 2) {
    return (
      <section id="compare" className="py-24 px-6 max-w-7xl mx-auto min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Compare Models</h2>
        <p className="text-gray-400">Ask the AI assistant to compare two models. Try "Compare the Nova and Zenith".</p>
      </section>
    );
  }

  return (
    <section id="compare" className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-4xl font-bold mb-12 text-center">Head to Head</h2>
      
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-6 border-b border-white/10 w-1/3 text-gray-400">Features</th>
              {models.map(car => (
                <th key={car.id} className="p-6 border-b border-white/10 w-1/3">
                  <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded-xl mb-4" />
                  <div className="text-2xl font-bold">{car.name}</div>
                  <div className="text-indigo-400 font-medium">{formatPrice(car.price, car.priceUSD, currency)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-6 border-b border-white/10 font-medium">Class</td>
              {models.map(car => <td key={car.id} className="p-6 border-b border-white/10">{car.type}</td>)}
            </tr>
            <tr>
              <td className="p-6 border-b border-white/10 font-medium">Seating</td>
              {models.map(car => <td key={car.id} className="p-6 border-b border-white/10">{car.seats} Passengers</td>)}
            </tr>
            <tr>
              <td className="p-6 border-b border-white/10 font-medium">Key Highlights</td>
              {models.map(car => (
                <td key={car.id} className="p-6 border-b border-white/10">
                  <ul className="list-disc list-inside text-gray-300 text-sm">
                    {car.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium">Autopilot</td>
              {models.map(car => (
                <td key={car.id} className="p-6">
                  <span className={`px-2 py-1 rounded text-sm ${car.autopilot ? 'bg-indigo-500/20 text-indigo-300' : 'bg-gray-500/20 text-gray-400'}`}>
                    {car.autopilot ? 'Included' : 'Not Available'}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
