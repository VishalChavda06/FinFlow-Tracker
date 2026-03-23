import React from 'react';
import { useApp } from '../../context/AppContext';
import { exportToCSV } from '../../utils/helpers';
import { CURRENCIES } from '../../utils/constants';
import styles from '../css/Topbar.module.css';

export default function Topbar() {
  const { currency, changeCurrency, theme, toggleTheme, transactions, showToast } = useApp();

  function handleExport() {
    const ok = exportToCSV(transactions, currency);
    showToast(ok ? '📥 CSV exported!' : '⚠️ Nothing to export');
  }

  return (
    <header className={`${styles.topbar} anim-fade-down`}>
      <div className={styles.logo}>
        Fin<em>Flow</em><sup>PRO</sup>
      </div>
      <div className={styles.right}>
        <select
          className={styles.currencySel}
          value={currency}
          onChange={(e) => { changeCurrency(e.target.value); showToast('💱 Currency: ' + e.target.value); }}
        >
          {Object.entries(CURRENCIES).map(([code, { sym }]) => (
            <option key={code} value={code}>{sym} {code}</option>
          ))}
        </select>
        <button className={styles.iconBtn} onClick={handleExport}>⬇ Export CSV</button>
        <button className={styles.iconBtn} onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}

