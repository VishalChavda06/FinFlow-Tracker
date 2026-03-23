export const CURRENCIES = {
  INR: { sym: '₹', name: 'INR' },
  USD: { sym: '$',  name: 'USD' },
  EUR: { sym: '€',  name: 'EUR' },
  GBP: { sym: '£',  name: 'GBP' },
  JPY: { sym: '¥',  name: 'JPY' },
  AED: { sym: 'د.إ', name: 'AED' },
  SGD: { sym: 'S$', name: 'SGD' },
};

export const CATEGORIES = {
  income:  ['Salary', 'Freelance', 'Investment', 'Gift', 'Rental', 'Business', 'Bonus', 'Other'],
  expense: ['Food', 'Rent', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Education', 'Utilities', 'Travel', 'Other'],
};

export const CAT_EMOJI = {
  Salary: '💼', Freelance: '💻', Investment: '📈', Gift: '🎁',
  Rental: '🏠', Business: '🏢', Bonus: '🏆',
  Food: '🍔', Rent: '🏠', Transport: '🚗', Shopping: '🛒',
  Health: '💊', Entertainment: '🎮', Education: '🎓',
  Utilities: '💡', Travel: '✈️', Other: '📌',
  Income: '💰', Expense: '💸',
};

export const FREQ_LABELS = {
  daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', yearly: 'Yearly',
};
