import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './TabNav.module.css';

const TABS = [
  { id: 'add',          label: '➕ Add' },
  { id: 'transactions', label: '📋 Transactions' },
  { id: 'recurring',   label: '🔄 Recurring' },
  { id: 'chart',       label: '📊 Chart' },
];

export default function TabNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className={`${styles.nav} anim-fade-up`} style={{ animationDelay: '0.2s' }}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.btn} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
