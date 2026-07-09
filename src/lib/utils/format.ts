/**
 * Format currency in Indian Rupees
 * e.g. 1240 -> ₹1,240
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date for UI
 * e.g. 15 Jun 2026
 */
export function formatDate(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(parsedDate)
}
