import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { cars } from '../data';

export default function BookingForm() {
  const { bookingDetails } = useAppContext();
  const [formData, setFormData] = useState({ name: '', email: '', model: '', date: '', city: '' });

  useEffect(() => {
    // When AI updates booking details, merge them into form state
    setFormData(prev => ({
      ...prev,
      model: bookingDetails.model || prev.model,
      date: bookingDetails.date || prev.date,
      city: bookingDetails.city || prev.city
    }));
  }, [bookingDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Test drive booked for ${formData.model} in ${formData.city} on ${formData.date}!`);
  };

  return (
    <section id="booking" className="py-24 px-6 max-w-3xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <h2 className="text-4xl font-bold mb-2">Book a Test Drive</h2>
        <p className="text-gray-400 mb-8">Let us know when and where, and we'll have the car ready.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" placeholder="john@example.com" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Model</label>
            <select required name="model" value={formData.model} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition appearance-none">
              <option value="">Choose a car...</option>
              {cars.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
              <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" placeholder="e.g. Mumbai" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
              <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-indigo-500 transition [color-scheme:dark]" />
            </div>
          </div>
          
          <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition shadow-lg mt-4">
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}
