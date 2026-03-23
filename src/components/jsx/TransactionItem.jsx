import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatAmount, formatDate } from '../../utils/helpers';
import styles from '../css/TransactionItem.module.css';

export default function TransactionItem({ transaction, index = 0 }) {
  const { setDeleteTarget, setEditTarget, currency } = useApp();
  const t = transaction;

  return (
    <div className={styles.item} style={{ animationDelay: `${index * 0.04}s` }}>
      <div className={`${styles.dot} ${styles[t.type]}`}>{t.emoji ?? '💰'}</div>

      <div className={styles.info}>
        <div className={styles.name}>{t.desc}</div>
        <div className={styles.meta}>
          <span>{formatDate(t.date)}</span>
          {t.category && <span className={styles.tag}>{t.category}</span>}
          {t.recurring && (
            <span className={styles.recurBadge}>🔄 {t.frequency ?? 'monthly'}</span>
          )}
        </div>
      </div>

      <div className={`${styles.amount} ${styles[t.type]}`}>
        {t.type === 'income' ? '+' : '-'}{formatAmount(t.amount, currency)}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.edit}`}
          onClick={() => setEditTarget(t)}
          title="Edit"
        >✏️</button>
        <button
          className={`${styles.btn} ${styles.del}`}
          onClick={() => setDeleteTarget(t)}
          title="Delete"
        >✕</button>
      </div>
    </div>
  );
}

