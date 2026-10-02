/** Format a paise-free INR amount the Indian way: ₹1,799 / ₹12,499 */
export function inr(amount: number): string {
  return `\u20B9${amount.toLocaleString("en-IN")}`;
}

export function pluralUnits(n: number): string {
  return `${n} ${n === 1 ? "UNIT" : "UNITS"}`;
}
