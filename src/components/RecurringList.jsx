import React from 'react';
import { useApp } from '../context/AppContext';
import TransactionItem from './TransactionItem';
import styles from './RecurringList.module.css';

export default function RecurringList() {
  const { transactions } = useApp();
  const recurring = transactions.filter((t) => t.recurring);

  const byFreq = {
    daily:   recurring.filter((t) => t.frequency === 'daily'),
    weekly:  recurring.filter((t) => t.frequency === 'weekly'),
    monthly: recurring.filter((t) => t.frequency === 'monthly'),
    yearly:  recurring.filter((t) => t.frequency === 'yearly'),
  };

  if (recurring.length === 0) {
    return (
      <div className={styles.box}>
        <h2 className={styles.title}>🔄 Recurring Transactions</h2>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔄</div>
          <div>No recurring transactions yet.</div>
          <div className={styles.hint}>Add one from the ➕ Add tab.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <h2 className={styles.title}>🔄 Recurring Transactions</h2>
        <span className={styles.badge}>{recurring.length} active</span>
      </div>

      {Object.entries(byFreq).map(([freq, items]) =>
        items.length > 0 ? (
          <div key={freq} className={styles.section}>
            <div className={styles.sectionLabel}>
              <span>{freq.charAt(0).toUpperCase() + freq.slice(1)}</span>
            </div>
            <div className={styles.list}>
              {items.map((t, i) => (
                <TransactionItem key={t.id} transaction={t} index={i} />
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
