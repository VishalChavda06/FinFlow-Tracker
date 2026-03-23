import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Topbar from './components/Topbar';
import SummaryCards from './components/SummaryCards';
import TabNav from './components/TabNav';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import RecurringList from './components/RecurringList';
import ChartPanel from './components/ChartPanel';
import EditModal from './components/EditModal';
import Toast from './components/Toast';
import styles from './App.module.css';

function AppContent() {
  const { activeTab } = useApp();

  return (
    <div className={styles.pageWrap}>
      <Topbar />
      <SummaryCards />
      <TabNav />

      <div className={styles.tabContent}>
        {activeTab === 'add'          && <AddTransactionForm />}
        {activeTab === 'transactions' && <TransactionList />}
        {activeTab === 'recurring'    && <RecurringList />}
        {activeTab === 'chart'        && <ChartPanel />}
      </div>

      <EditModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
