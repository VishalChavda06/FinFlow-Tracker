import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatAmount, formatDate } from '../../utils/helpers';
import styles from '../css/DeleteConfirmModal.module.css';

export default function DeleteConfirmModal() {
  const {
    deleteTarget, setDeleteTarget, confirmDeleteTransaction, showToast, currency,
  } = useApp();

  if (!deleteTarget) return null;

  function handleConfirm() {
    confirmDeleteTransaction();
    showToast('🗑️ Transaction removed');
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) setDeleteTarget(null);
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Delete Transaction?</h2>
        <p className={styles.info}>
          This action cannot be undone.
        </p>
        <div className={styles.preview}>
          <div className={styles.desc}>{deleteTarget.desc}</div>
          <div className={styles.meta}>
            <span>{formatDate(deleteTarget.date)}</span>
            {deleteTarget.category && <span>{deleteTarget.category}</span>}
            <span className={styles.amount}>
              {formatAmount(deleteTarget.amount, currency)}
            </span>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={() => setDeleteTarget(null)}>
            Cancel
          </button>
          <button className={styles.btnDelete} onClick={handleConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

