import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Topbar from './components/jsx/Topbar';
import SummaryCards from './components/jsx/SummaryCards';
import TabNav from './components/jsx/TabNav';
import AddTransactionForm from './components/jsx/AddTransactionForm';
import TransactionList from './components/jsx/TransactionList';
import RecurringList from './components/jsx/RecurringList';
import ChartPanel from './components/jsx/ChartPanel';
import EditModal from './components/jsx/EditModal';
import DeleteConfirmModal from './components/jsx/DeleteConfirmModal';
import Toast from './components/jsx/Toast';
import styles from './App.module.css';

function AppContent() {
  const { activeTab } = useApp();

  return (
    <div className={styles.pageWrap}>
      <Topbar />
      <TabNav />

      <div key={activeTab} className={styles.tabContent}>
        {activeTab === 'home' && <SummaryCards />}
        {activeTab === 'add' && <AddTransactionForm />}
        {activeTab === 'transactions' && <TransactionList />}
        {activeTab === 'recurring' && <RecurringList />}
        {activeTab === 'chart' && <ChartPanel />}
      </div>

      <EditModal />
      <DeleteConfirmModal />
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
