# Frontend Master Context & Phase Specifications
# MODUS Enterprise AI Platform

Location: `moduseti assissment_frontend/`

---

## 🎯 Frontend Objective
Build an Executive Intelligence Dashboard for CEOs to upload company documents/datasets, visualize quantitative sales and customer KPIs via Recharts, view evidence-grounded strategic transformation recommendations, and interact via a Grounded Executive AI Chat.

---

## 🎨 Design System & Stack Summary
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS + Glassmorphism
- **Data Visualizations**: Recharts
- **Async State**: React Query (TanStack Query)
- **Icons**: Lucide React

---

## 🛠️ Frontend Development Phases (Phases 8 & 9)

### Phase 8: Executive Dashboard & Upload Portal
- **Dropzone**: Multi-file dropzone for 4 files (Company Profile PDF, HR Policy PDF, Sales CSV, Customer CSV).
- **KPI Widgets**: High-level metric summary cards (Total Revenue, YoY Growth %, Churn Rate, LTV:CAC Ratio).
- **Visual Analytics**: Interactive Recharts for revenue trends and customer retention breakdown.
- **Strategic Recommendations**: Executive card views displaying prioritized issues, recommendations, impact, and interactive citation badges.
- **Evidence Drawer**: Slide-over modal opening exact document text chunks or CSV metrics when a citation is clicked.

### Phase 9: Grounded AI Executive Chat
- **Chat Drawer**: Grounded conversational panel allowing CEOs to ask follow-up questions.
- **Citation Renderer**: Renders clickable `CitationBadge` pills (`[Source: HR_Policy_2025.pdf (Sec 4.2)]`).
- **Real-time State**: Uses React Query mutations for sub-second Groq response rendering.
