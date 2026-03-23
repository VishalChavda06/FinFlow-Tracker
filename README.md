# FinFlow Pro

FinFlow Pro is a lightweight personal finance tracker built with React + Vite. It lets you add income/expense transactions, mark some as recurring, view your totals, and visualize the last several months in a chart.

## Features

- Add transactions (income/expense) with:
  - Description, amount, date
  - Category (income/expense categories)
  - Optional recurring flag + frequency (daily/weekly/monthly/yearly)
- Transactions management:
  - Browse all transactions
  - Filter by type (all/income/expense)
  - Search by description/category
  - Sort (newest/oldest/highest/lowest)
- Recurring transactions view
- Monthly overview chart (Chart.js):
  - Income vs expenses over the last 7 months
  - Toggle between bar and line chart
- Summary cards:
  - Net balance, total income, total expenses
  - Income/expense share indicator
- Currency + theme controls (persisted)
- Export transactions to CSV from the top bar

## Tech Stack

- React 18
- Vite
- Chart.js + `react-chartjs-2`
- CSS Modules for component styling

## Data & Preferences

The app persists data in `localStorage`:

- Transactions: `finflow_pro`
- Currency: `finflow_currency`
- Theme: `finflow_theme` (`dark` / `light`)

## Project Structure (high level)

- `src/context/AppContext.jsx`: global state (transactions, currency, theme, active tab, summary) and actions (add/update/delete, export toast).
- `src/App.jsx`: app shell; renders the correct tab content.
- `src/components/`:
  - `Topbar.jsx`: currency selector, theme toggle, CSV export
  - `SummaryCards.jsx`: totals and balance cards
  - `TabNav.jsx`: Add / Transactions / Recurring / Chart tabs
  - `AddTransactionForm.jsx`: form to add transactions (and configure recurring)
  - `TransactionList.jsx`: filtered/searchable/sortable list
  - `RecurringList.jsx`: lists recurring transactions grouped by frequency
  - `ChartPanel.jsx`: income/expense chart
  - `EditModal.jsx`, `Toast.jsx`: edit flow and notifications
- `src/utils/`:
  - `helpers.js`: formatting, date helpers, CSV export, and last-7-months calculation
  - `constants.js`: currency + category mappings

## Getting Started

1. Install dependencies:
   - `npm install`
2. Run the dev server:
   - `npm run dev` (or `npm start`)
3. Open:
   - `http://localhost:5173`

## Build & Preview

- Build: `npm run build`
- Preview: `npm run preview`

