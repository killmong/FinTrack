# FinTrack — Personal Finance Dashboard

A clean, interactive finance dashboard built with React and TypeScript.
Track income, expenses, and spending patterns with role-based access control.

---

## Live Demo

> Run locally using the setup instructions below.

---

## Screenshots

> Add screenshots of your dashboard, transactions, and insights pages here.

---

## Features

### Dashboard

- Summary cards showing Total Balance, Income, and Expenses
- Area chart showing balance trend over time
- Donut pie chart showing spending breakdown by category
- Recent transactions list with quick navigation

### Transactions

- Full transaction list with date, amount, category, and type
- Live search by title or category
- Filter by category, type (income/expense)
- Sort by date or amount in ascending or descending order
- Export transactions as CSV or JSON
- Add, edit, and delete transactions (Admin only)

### Insights

- Total savings calculation
- Highest and lowest spending categories
- Average monthly income and expenses
- Month over month expense comparison
- Monthly income vs expenses bar chart
- Category spending breakdown with progress bars

### Role Based UI

- Viewer — read only access, no add/edit/delete buttons
- Admin — full access including add, edit, delete, and export
- Role switcher in navbar, persists across page refreshes

### UI/UX

- Dark mode toggle, persists across sessions
- Fully responsive — works on mobile, tablet, and desktop
- Empty state handling when no data matches filters
- Toast notifications on every action
- Clean and minimal design

---

## Tech Stack

| Layer            | Technology            |
| ---------------- | --------------------- |
| Framework        | React 18 + TypeScript |
| Build Tool       | Vite                  |
| Styling          | Tailwind CSS v4       |
| State Management | Zustand               |
| Routing          | React Router DOM v6   |
| Charts           | Recharts              |
| HTTP Client      | Axios                 |
| Mock API         | JSON Server           |
| Forms            | React Hook Form       |
| Date Handling    | date-fns              |
| Icons            | Lucide React          |
| Notifications    | React Hot Toast       |
| Export           | PapaParse             |

---

## Project Structure
client/
├── src/
│   ├── types/          # TypeScript interfaces
│   ├── constants/      # Roles, categories, chart colors
│   ├── data/           # Mock data (replaced by API later)
│   ├── store/          # Zustand state stores
│   ├── services/       # API calls — swap mock for real later
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Pure helper functions
│   ├── components/     # UI components by feature
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   └── insights/
│   ├── pages/          # One file per route
│   └── styles/         # Global CSS
├── db.json             # JSON Server mock database
└── package.json

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/fintrack.git
cd fintrack/client
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server and mock API together**
```bash
npm run dev:all
```

This runs two servers simultaneously:
- React app at `http://localhost:5173`
- JSON Server mock API at `http://localhost:5000`

### Individual Commands
```bash
npm run dev      # React app only
npm run server   # JSON Server only
npm run build    # Production build
npm run preview  # Preview production build
```

---

## Role Based Access

Switch roles using the dropdown in the top navbar.

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |
| Export data | ✅ | ✅ |

Selected role persists across page refreshes.

---

## Adding a Real Backend Later

This project is structured to make backend integration seamless.
All API calls live in one place — `src/services/`.

**Step 1 — Build your Express + MongoDB backend**

**Step 2 — Change one line in `src/services/api.ts`**
```ts
// From
baseURL: 'http://localhost:5000'   // JSON Server

// To
baseURL: 'http://localhost:8000'   // Your Express API
```

**Step 3 — Nothing else changes**

Your components, stores, and hooks stay exactly the same because
they never talk to the API directly — only through the services layer.

---

## API Endpoints (JSON Server)
