import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useApp } from '../context/AppContext';
import { getLast7Months } from '../utils/helpers';
import { CURRENCIES } from '../utils/constants';
import styles from './ChartPanel.module.css';

ChartJS.register(
  CategoryScale, LinearScale,
  BarElement, PointElement, LineElement,
  Title, Tooltip, Legend, Filler
);

export default function ChartPanel() {
  const { transactions, currency, theme } = useApp();
  const [chartType, setChartType] = useState('bar');

  const months = useMemo(() => getLast7Months(), []);

  const incData = useMemo(() =>
    months.map((m) =>
      transactions
        .filter((t) => t.type === 'income' && (t.date ?? '').startsWith(m.key))
        .reduce((s, t) => s + t.amount, 0)
    ), [transactions, months]);

  const expData = useMemo(() =>
    months.map((m) =>
      transactions
        .filter((t) => t.type === 'expense' && (t.date ?? '').startsWith(m.key))
        .reduce((s, t) => s + t.amount, 0)
    ), [transactions, months]);

  const isDark = theme === 'dark';
  const gridColor  = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
  const tickColor  = isDark ? '#6b7280' : '#8a93b2';
  const tooltipBg  = isDark ? '#1a1d2e' : '#ffffff';
  const tooltipTxt = isDark ? '#e8eaf6' : '#1a1d2e';
  const sym = CURRENCIES[currency]?.sym ?? '₹';

  const data = {
    labels: months.map((m) => m.label),
    datasets: [
      {
        label: 'Income',
        data: incData,
        backgroundColor: chartType === 'bar'
          ? 'rgba(0,229,160,0.55)'
          : (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 260);
              gradient.addColorStop(0, 'rgba(0,229,160,0.35)');
              gradient.addColorStop(1, 'rgba(0,229,160,0.02)');
              return gradient;
            },
        borderColor: 'rgb(0,229,160)',
        borderWidth: 2,
        borderRadius: chartType === 'bar' ? 8 : 0,
        pointBackgroundColor: 'rgb(0,229,160)',
        pointRadius: chartType === 'line' ? 4 : 0,
        tension: 0.45,
        fill: chartType === 'line',
      },
      {
        label: 'Expenses',
        data: expData,
        backgroundColor: chartType === 'bar'
          ? 'rgba(255,107,107,0.55)'
          : (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 260);
              gradient.addColorStop(0, 'rgba(255,107,107,0.35)');
              gradient.addColorStop(1, 'rgba(255,107,107,0.02)');
              return gradient;
            },
        borderColor: 'rgb(255,107,107)',
        borderWidth: 2,
        borderRadius: chartType === 'bar' ? 8 : 0,
        pointBackgroundColor: 'rgb(255,107,107)',
        pointRadius: chartType === 'line' ? 4 : 0,
        tension: 0.45,
        fill: chartType === 'line',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipTxt,
        bodyColor: isDark ? '#b0b8d0' : '#3d4166',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) =>
            ` ${ctx.dataset.label}: ${sym}${ctx.parsed.y.toLocaleString('en', { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: tickColor, font: { family: 'DM Sans', size: 11 } },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          font: { family: 'DM Sans', size: 11 },
          callback: (v) => sym + v.toLocaleString(),
        },
        beginAtZero: true,
      },
    },
  };

  const ChartComponent = chartType === 'bar' ? Bar : Line;

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <h2 className={styles.title}>📊 Monthly Overview</h2>
        <div className={styles.typeBtns}>
          {['bar', 'line'].map((t) => (
            <button
              key={t}
              className={`${styles.typeBtn} ${chartType === t ? styles.active : ''}`}
              onClick={() => setChartType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartWrap}>
        <ChartComponent data={data} options={options} />
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{ background: 'var(--income-a)' }} />
          Income
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{ background: 'var(--expense-a)' }} />
          Expenses
        </div>
      </div>

      {transactions.length === 0 && (
        <div className={styles.emptyOverlay}>
          <div className={styles.emptyIcon}>📊</div>
          <div>Add transactions to see your chart</div>
        </div>
      )}
    </div>
  );
}
