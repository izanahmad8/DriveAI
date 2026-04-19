export function formatPrice(priceINR, priceUSD, currency) {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(priceUSD);
  }
  return `₹${(priceINR / 100000).toFixed(2)} Lakh`;
}
