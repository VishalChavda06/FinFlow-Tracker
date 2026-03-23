import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import TransactionItem from './TransactionItem';
import styles from '../css/TransactionList.module.css';

const FILTERS = ['all', 'income', 'expense'];

export default function TransactionList() {
  const { transactions } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort,   setSort]   = useState('newest');

  const filtered = useMemo(() => {
    let items = transactions.slice();
    if (filter !== 'all') items = items.filter((t) => t.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (t) => t.desc.toLowerCase().includes(q) || (t.category ?? '').toLowerCase().includes(q)
      );
    }
    items.sort((a, b) => {
      if (sort === 'newest') return b.id - a.id;
      if (sort === 'oldest') return a.id - b.id;
      if (sort === 'high')   return b.amount - a.amount;
      if (sort === 'low')    return a.amount - b.amount;
      return 0;
    });
    return items;
  }, [transactions, filter, search, sort]);

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <h2 className={styles.title}>All Transactions</h2>
        <span className={styles.count}>{transactions.length} records</span>
      </div>

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="🔍 Search by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={styles.sortSel} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="high">Highest amount</option>
          <option value="low">Lowest amount</option>
        </select>
      </div>

      <div className={styles.filterTabs}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.fTab} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🪙</div>
          <div>No transactions found.</div>
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map((t, i) => (
            <TransactionItem key={t.id} transaction={t} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

