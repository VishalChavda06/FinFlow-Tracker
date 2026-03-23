import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CAT_EMOJI } from '../utils/constants';
import { todayISO } from '../utils/helpers';
import styles from './AddTransactionForm.module.css';

export default function AddTransactionForm() {
  const { addTransaction, showToast } = useApp();

  const [type,     setType]     = useState('income');
  const [desc,     setDesc]     = useState('');
  const [amount,   setAmount]   = useState('');
  const [date,     setDate]     = useState(todayISO());
  const [category, setCategory] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState('monthly');
  const [shake,    setShake]    = useState(false);

  function handleTypeChange(t) {
    setType(t);
    setCategory('');
  }

  function handleCatPill(cat) {
    setCategory(cat);
  }

  function handleSubmit() {
    if (!desc.trim() || !amount || parseFloat(amount) <= 0) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      showToast('⚠️ Please fill description & amount');
      return;
    }
    const cat = category || (type === 'income' ? 'Income' : 'Expense');
    addTransaction({
      desc: desc.trim(),
      amount: parseFloat(amount),
      type,
      category: cat,
      emoji: CAT_EMOJI[cat] ?? (type === 'income' ? '💰' : '💸'),
      date,
      recurring,
      frequency: recurring ? frequency : null,
    });
    setDesc('');
    setAmount('');
    setCategory('');
    setRecurring(false);
    setDate(todayISO());
    showToast('✅ Transaction added!');
  }

  const cats = CATEGORIES[type];

  return (
    <div className={`${styles.box} ${shake ? styles.shake : ''}`}>
      <h2 className={styles.title}>New Transaction</h2>

      <div className={styles.grid}>
        {/* Description */}
        <div className={`${styles.field} ${styles.full}`}>
          <label>Description</label>
          <input
            type="text"
            placeholder="e.g. Freelance payment, Grocery…"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        {/* Amount */}
        <div className={styles.field}>
          <label>Amount</label>
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Date */}
        <div className={styles.field}>
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        {/* Type Toggle */}
        <div className={styles.field}>
          <label>Type</label>
          <div className={styles.typeToggle}>
            <button
              className={`${styles.tIncome} ${type === 'income' ? styles.active : ''}`}
              onClick={() => handleTypeChange('income')}
            >Income</button>
            <button
              className={`${styles.tExpense} ${type === 'expense' ? styles.active : ''}`}
              onClick={() => handleTypeChange('expense')}
            >Expense</button>
          </div>
        </div>

        {/* Category select */}
        <div className={styles.field}>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">— choose —</option>
            {cats.map((c) => (
              <option key={c} value={c}>{(CAT_EMOJI[c] ?? '') + '  ' + c}</option>
            ))}
          </select>
        </div>

        {/* Quick Pills */}
        <div className={`${styles.field} ${styles.full}`}>
          <label>Quick Pick</label>
          <div className={styles.pills}>
            {cats.map((c) => (
              <button
                key={c}
                className={`${styles.pill} ${category === c ? styles.pillSel : ''}`}
                onClick={() => handleCatPill(c)}
              >
                {(CAT_EMOJI[c] ?? '')} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Recurring */}
        <div className={`${styles.field} ${styles.full}`}>
          <div
            className={`${styles.recurRow} ${recurring ? styles.recurActive : ''}`}
            onClick={() => setRecurring(!recurring)}
          >
            <input
              type="checkbox"
              checked={recurring}
              onChange={() => setRecurring(!recurring)}
              onClick={(e) => e.stopPropagation()}
            />
            <span>🔄 Make this a recurring transaction</span>
          </div>
        </div>

        {recurring && (
          <div className={styles.field}>
            <label>Frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}

        {/* Submit */}
        <div className={`${styles.field} ${styles.full}`}>
          <button className={styles.btnAdd} onClick={handleSubmit}>
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
