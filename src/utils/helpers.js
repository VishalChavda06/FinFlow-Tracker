import { CURRENCIES } from './constants';

export function formatAmount(amount, currency) {
  const sym = CURRENCIES[currency]?.sym ?? '₹';
  const abs = Math.abs(amount);
  if (currency === 'JPY') return sym + Math.round(abs).toLocaleString('en');
  return sym + abs.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T00:00').toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export function getLast7Months() {
  const now = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (6 - i), 1);
    return {
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en', { month: 'short', year: '2-digit' }),
    };
  });
}

export function exportToCSV(transactions, currency) {
  if (!transactions.length) return false;
  const header = ['Date', 'Description', 'Category', 'Type', `Amount (${currency})`, 'Recurring', 'Frequency'];
  const rows = transactions.map((t) => [
    t.date ?? '',
    `"${(t.desc ?? '').replace(/"/g, '""')}"`,
    t.category ?? '',
    t.type,
    t.amount,
    t.recurring ? 'Yes' : 'No',
    t.frequency ?? '',
  ]);
  const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `finflow_${todayISO()}.csv`;
  a.click();
  return true;
}
