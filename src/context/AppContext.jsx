import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('finflow_pro') || '[]'); }
    catch { return []; }
  });

  const [currency, setCurrency] = useState(
    () => localStorage.getItem('finflow_currency') || 'INR'
  );

  const [theme, setTheme] = useState(
    () => localStorage.getItem('finflow_theme') || 'dark'
  );

  const [toast, setToast] = useState({ msg: '', visible: false });
  const [activeTab, setActiveTab] = useState('home');
  const [editTarget, setEditTarget] = useState(null); // transaction being edited
  const [deleteTarget, setDeleteTarget] = useState(null); // transaction pending delete

  const persist = useCallback((txns) => {
    setTransactions(txns);
    localStorage.setItem('finflow_pro', JSON.stringify(txns));
  }, []);

  const addTransaction = useCallback((tx) => {
    persist([{ id: Date.now(), ...tx }, ...transactions]);
  }, [transactions, persist]);

  const updateTransaction = useCallback((id, updates) => {
    persist(transactions.map((t) => t.id === id ? { ...t, ...updates } : t));
  }, [transactions, persist]);

  const deleteTransaction = useCallback((id) => {
    persist(transactions.filter((t) => t.id !== id));
  }, [transactions, persist]);

  const confirmDeleteTransaction = useCallback(() => {
    if (!deleteTarget) return;
    deleteTransaction(deleteTarget.id);
    setDeleteTarget(null);
  }, [deleteTarget, deleteTransaction]);

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2400);
  }, []);

  const changeCurrency = useCallback((c) => {
    setCurrency(c);
    localStorage.setItem('finflow_currency', c);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('finflow_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }, [theme]);

  // apply theme on mount
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Dashboard summary is month-scoped. Full transaction history remains intact.
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthTransactions = transactions.filter((t) => (t.date ?? '').startsWith(monthKey));

  const income  = monthTransactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = monthTransactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  return (
    <AppContext.Provider value={{
      transactions, addTransaction, updateTransaction, deleteTransaction,
      deleteTarget, setDeleteTarget, confirmDeleteTransaction,
      currency, changeCurrency,
      theme, toggleTheme,
      toast, showToast,
      activeTab, setActiveTab,
      editTarget, setEditTarget,
      summary: {
        income, expense, balance,
        periodLabel: now.toLocaleDateString('en', { month: 'long', year: 'numeric' }),
        incomeCount: monthTransactions.filter((t) => t.type === 'income').length,
        expenseCount: monthTransactions.filter((t) => t.type === 'expense').length,
      },
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
