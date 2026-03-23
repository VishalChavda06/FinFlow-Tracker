import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { formatAmount } from '../../utils/helpers';
import styles from '../css/SummaryCards.module.css';

function StatCard({ variant, icon, label, value, sub }) {
  const valRef = useRef(null);
  const prevVal = useRef(value);

  useEffect(() => {
    if (prevVal.current !== value && valRef.current) {
      valRef.current.classList.remove(styles.pop);
      void valRef.current.offsetWidth;
      valRef.current.classList.add(styles.pop);
      prevVal.current = value;
    }
  }, [value]);

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.value} ref={valRef}>{value}</div>
      <div className={styles.sub}>{sub}</div>
    </div>
  );
}

export default function SummaryCards() {
  const { summary, currency, transactions } = useApp();
  const {
    income, expense, balance, periodLabel, incomeCount, expenseCount,
  } = summary;

  const total = income + expense;
  const pct   = total ? Math.round((income / total) * 100) : 0;

  return (
    <>
      <div className={`${styles.grid} anim-fade-up`} style={{ animationDelay: '0.1s' }}>
        <StatCard
          variant="balance"
          icon="💎"
          label={`Net Balance (${periodLabel})`}
          value={formatAmount(balance, currency)}
          sub={balance >= 0 ? `+${formatAmount(balance, currency)} surplus` : `${formatAmount(balance, currency)} deficit`}
        />
        <StatCard
          variant="income"
          icon="📈"
          label={`Income (${periodLabel})`}
          value={formatAmount(income, currency)}
          sub={`${incomeCount} transaction${incomeCount !== 1 ? 's' : ''}`}
        />
        <StatCard
          variant="expense"
          icon="📉"
          label={`Expenses (${periodLabel})`}
          value={formatAmount(expense, currency)}
          sub={`${expenseCount} transaction${expenseCount !== 1 ? 's' : ''}`}
        />
      </div>

      <div className={`${styles.ratioWrap} anim-fade-up`} style={{ animationDelay: '0.15s' }}>
        <div className={styles.ratioLabel}>
          <span>💚 Income share</span>
          <span>{total ? `${pct}% income · ${100 - pct}% expense` : '–'}</span>
        </div>
        <div className={styles.ratioBar}>
          <div className={styles.ratioFill} style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className={`${styles.ratioWrap} anim-fade-up`} style={{ animationDelay: '0.18s' }}>
        <div className={styles.ratioLabel}>
          <span>🗂️ Stored history</span>
          <span>{transactions.length} total transaction{transactions.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </>
  );
}

