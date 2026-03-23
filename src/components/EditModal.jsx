import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CAT_EMOJI } from '../utils/constants';
import styles from './EditModal.module.css';

export default function EditModal() {
  const { editTarget, setEditTarget, updateTransaction, showToast } = useApp();

  const [desc,     setDesc]     = useState('');
  const [amount,   setAmount]   = useState('');
  const [date,     setDate]     = useState('');
  const [type,     setType]     = useState('income');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editTarget) {
      setDesc(editTarget.desc ?? '');
      setAmount(String(editTarget.amount ?? ''));
      setDate(editTarget.date ?? '');
      setType(editTarget.type ?? 'income');
      setCategory(editTarget.category ?? '');
    }
  }, [editTarget]);

  if (!editTarget) return null;

  function handleSave() {
    const cat = category || (type === 'income' ? 'Income' : 'Expense');
    updateTransaction(editTarget.id, {
      desc: desc.trim(),
      amount: parseFloat(amount) || 0,
      date,
      type,
      category: cat,
      emoji: CAT_EMOJI[cat] ?? (type === 'income' ? '💰' : '💸'),
    });
    setEditTarget(null);
    showToast('✏️ Transaction updated!');
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) setEditTarget(null);
  }

  const cats = CATEGORIES[type];

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.title}>✏️ Edit Transaction</h2>

        <div className={styles.grid}>
          <div className={`${styles.field} ${styles.full}`}>
            <label>Description</label>
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Amount</label>
            <input type="number" value={amount} min="0" step="0.01" onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Type</label>
            <div className={styles.typeToggle}>
              <button
                className={`${styles.tIncome} ${type === 'income' ? styles.active : ''}`}
                onClick={() => { setType('income'); setCategory(''); }}
              >Income</button>
              <button
                className={`${styles.tExpense} ${type === 'expense' ? styles.active : ''}`}
                onClick={() => { setType('expense'); setCategory(''); }}
              >Expense</button>
            </div>
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">— choose —</option>
              {cats.map((c) => (
                <option key={c} value={c}>{(CAT_EMOJI[c] ?? '') + '  ' + c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={() => setEditTarget(null)}>Cancel</button>
          <button className={styles.btnSave} onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
