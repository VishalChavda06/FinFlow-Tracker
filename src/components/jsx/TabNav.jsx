import React from 'react';
import { useApp } from '../../context/AppContext';
import styles from '../css/TabNav.module.css';

const TABS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'add', icon: '➕', label: 'Add' },
  { id: 'transactions', icon: '📋', label: 'Transactions' },
  { id: 'recurring', icon: '🔄', label: 'Recurring' },
  { id: 'chart', icon: '📊', label: 'Chart' },
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
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

