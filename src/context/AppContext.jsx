import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currency, setCurrency] = useState('INR'); // INR or USD
  const [modelFilter, setModelFilter] = useState(''); // '' means all, could be 'SUV', '<40L', 'family', etc.
  const [compareModels, setCompareModels] = useState([]); // array of car ids
  const [bookingDetails, setBookingDetails] = useState({ model: '', date: '', city: '' });
  const [highlightedCarId, setHighlightedCarId] = useState(null);

  const value = {
    currency, setCurrency,
    modelFilter, setModelFilter,
    compareModels, setCompareModels,
    bookingDetails, setBookingDetails,
    highlightedCarId, setHighlightedCarId
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
