# Executive Frontend Guidelines & Technical Architecture
# MODUS Enterprise AI Platform

Location: `moduseti assissment_frontend/`

---

## 1. Technology Stack & Core Packages

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS + Vanilla CSS (Glassmorphism & Custom Executive Gradients)
- **Data Fetching & State**: React Query (TanStack Query)
- **Visual Analytics**: Recharts
- **Iconography**: Lucide React
- **Typography**: Inter / Outfit (Google Fonts)

---

## 2. Executive Design Aesthetics & Styling Rules 🎨

### Color Palette
- **Backgrounds**: Deep Dark Slate (`#0f172a`, `#1e293b`), Midnight Indigo (`#090d16`).
- **Primary Accent**: Electric Violet (`#6366f1`), Royal Blue (`#3b82f6`).
- **Status & Priority Indicators**:
  - **High Priority / Risk**: Crimson (`#ef4444`, `bg-red-500/10 border-red-500/30 text-red-400`)
  - **Medium Priority**: Warm Amber (`#f59e0b`, `bg-amber-500/10 border-amber-500/30 text-amber-400`)
  - **Quick Wins / Positive**: Emerald Green (`#10b981`, `bg-emerald-500/10 border-emerald-500/30 text-emerald-400`)

### Visual Effects & Micro-Interactions
- **Glassmorphism Cards**: `backdrop-blur-md bg-slate-900/70 border border-slate-800/80 shadow-xl rounded-xl`
- **Gradients**: `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent`
- **Micro-animations**: Smooth hover transitions (`transition-all duration-200 ease-in-out hover:scale-[1.01] hover:border-indigo-500/50`)
- **Shimmer Skeletons**: Display animated shimmer loading blocks while fetching backend analytics via React Query.

---

## 3. Directory Layout & Component Roles

```
moduseti assissment_frontend/
 ├── components/
 │    ├── Navbar.tsx                   # Top executive navigation & status badge
 │    ├── Header.tsx                   # Page hero title & fast action buttons
 │    ├── StrategicRecommendationCard.tsx # Strategic issue, recommendation, impact card
 │    ├── EvidenceDrawer.tsx           # Slide-over details modal showing exact source facts
 │    └── PriorityBadge.tsx            # High/Medium/Low priority pill badges
 │
 ├── upload/
 │    └── UploadDropzone.tsx           # Multi-file upload dropzone for 4 files (2 PDFs, 2 CSVs)
 │
 ├── charts/
 │    ├── ExecutiveKPICards.tsx        # High-level metric summary widgets (Revenue, Growth, Churn)
 │    ├── RevenueTrendChart.tsx        # Recharts Area/Line chart for sales growth
 │    └── CustomerChurnChart.tsx       # Recharts Bar/Pie chart for customer health & CSAT
 │
 ├── chat/
 │    ├── GroundedChatDrawer.tsx       # Grounded executive Q&A drawer/panel
 │    ├── ChatMessage.tsx              # Markdown message bubble with citation badges
 │    └── CitationBadge.tsx            # Clickable pill (`[Source: HR_Policy.pdf (Sec 4.2)]`)
 │
 └── pages/
      ├── index.tsx                    # Executive Dashboard main page layout
      └── _app.tsx                     # React Query Provider & global font wrapper
```

---

## 4. Key Engineering & API Integration Rules

1. **Dynamic Chart Rendering**: Recharts MUST consume dynamic numeric metrics from FastAPI backend endpoints (`/api/upload/sales`, `/api/upload/customer`, `/api/dashboard/generate`).
2. **Interactive Citation Badges**: Recommendation cards and AI Chat messages MUST render clickable `CitationBadge` components that trigger the `EvidenceDrawer` with source metadata.
3. **React Query State Management**: Use `useQuery` for fetching dashboard state and `useMutation` for file uploads and chat prompts.
4. **SEO & Accessibility**: Include semantic HTML5 (`<header>`, `<main>`, `<section>`), descriptive page title tags, and unique `id` attributes for all interactive UI controls.
