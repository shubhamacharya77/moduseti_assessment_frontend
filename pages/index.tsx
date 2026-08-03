import React, { useState } from 'react';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { UploadDropzone } from '@/upload/UploadDropzone';
import { SalesKPICards } from '@/charts/SalesKPICards';
import { CustomerKPICards } from '@/charts/CustomerKPICards';
import { RevenueTrendChart } from '@/charts/RevenueTrendChart';
import { CategoryBreakdownChart } from '@/charts/CategoryBreakdownChart';
import { RegionalSalesChart } from '@/charts/RegionalSalesChart';
import { CustomerChurnChart } from '@/charts/CustomerChurnChart';
import { CustomerSegmentChart } from '@/charts/CustomerSegmentChart';
import { LoyaltyTierChart } from '@/charts/LoyaltyTierChart';
import { StrategicRecommendationCard } from '@/components/StrategicRecommendationCard';
import { EvidenceDrawer, EvidenceDrawerItem } from '@/components/EvidenceDrawer';
import { Sparkles, Loader2, TrendingUp, Users } from 'lucide-react';

const BACKEND_URL = 'http://localhost:8000';
const MASTER_PROMPT = 'What high-priority strategic transformation recommendations should we execute?';

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<EvidenceDrawerItem | null>(null);

  // 1. Fetch Dashboard Metrics automatically on Landing
  const { data: metricsData, refetch: refetchMetrics, isError } = useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/metrics`);
      if (!res.ok) throw new Error('Failed to fetch dashboard metrics');
      return res.json();
    },
  });

  // 2. Fetch Strategic Playbook automatically on Landing
  const { data: strategyData, isLoading: isGeneratingStrategy, refetch: refetchStrategy } = useQuery({
    queryKey: ['strategicPlaybook'],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: MASTER_PROMPT }),
      });
      if (!res.ok) throw new Error('Strategy generation failed');
      return res.json();
    },
  });

  const handleRefreshAll = () => {
    refetchMetrics();
    refetchStrategy();
  };

  const salesSummary = metricsData?.metrics?.sales_summary || {};
  const customerSummary = metricsData?.metrics?.customer_summary || {};
  
  // Sales breakdowns
  const monthlyTrends = salesSummary?.monthly_revenue_trends || {};
  const categoryBreakdown = salesSummary?.category_breakdown || {};
  const regionalBreakdown = salesSummary?.regional_breakdown || {};

  // Customer breakdowns
  const churnRiskBreakdown = customerSummary?.churn_risk_breakdown || {};
  const segmentBreakdown = customerSummary?.segment_breakdown || {};
  const loyaltyTierBreakdown = customerSummary?.loyalty_tier_breakdown || {};

  const handleSelectCitation = (citation: any) => {
    setSelectedCitation(citation);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Head>
        <title>MODUS Enterprise AI Strategy Platform</title>
        <meta name="description" content="AI Transformation Strategy Intelligence Platform for Executive Leadership" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
        {/* Navigation Bar */}
        <Navbar
          onRefresh={handleRefreshAll}
          isBackendConnected={!isError}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
          {/* Hero Header */}
          <Header />

          {/* Multi-Modal File Upload Dropzone */}
          <UploadDropzone
            onUploadSuccess={handleRefreshAll}
            backendUrl={BACKEND_URL}
          />

          {/* STRATEGIC INTELLIGENCE PLAYBOOK (Includes embedded Evidence Cards) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" /> Strategic Intelligence Playbook
              </h2>
              {isGeneratingStrategy && (
                <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Analyzing evidence & generating recommendations...</span>
                </div>
              )}
            </div>

            {strategyData?.strategic_response ? (
              <StrategicRecommendationCard
                masterPrompt={MASTER_PROMPT}
                strategicIssues={strategyData.strategic_response.strategic_issues || []}
                recommendation={strategyData.strategic_response.recommendation || ''}
                businessImpact={strategyData.strategic_response.business_impact || ''}
                priority={strategyData.strategic_response.priority || 'High'}
                expectedOutcome={strategyData.strategic_response.expected_outcome || ''}
                citations={strategyData.evidence_package?.items || []}
                onSelectCitation={handleSelectCitation}
              />
            ) : isGeneratingStrategy ? (
              <div className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center text-slate-400 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                <span className="text-sm font-medium text-slate-300">Analyzing company documents, sales, customer data, and benchmarks...</span>
              </div>
            ) : null}
          </section>

          {/* SECTION 1: SALES & REVENUE INTELLIGENCE */}
          <section className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  Sales & Revenue Intelligence
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Quantitative sales velocity, revenue trends, product line performance, and regional distribution.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                Commercial Data
              </span>
            </div>

            {/* Dedicated Sales KPI Cards */}
            <SalesKPICards salesSummary={salesSummary} />

            {/* Sales Visualizations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RevenueTrendChart monthlyTrends={monthlyTrends} />
              </div>
              <div>
                <RegionalSalesChart regionalBreakdown={regionalBreakdown} />
              </div>
              <div className="lg:col-span-3">
                <CategoryBreakdownChart categoryBreakdown={categoryBreakdown} />
              </div>
            </div>
          </section>

          {/* SECTION 2: CUSTOMER HEALTH & RETENTION INTELLIGENCE */}
          <section className="space-y-4 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Users className="w-5 h-5" />
                  </div>
                  Customer & Retention Intelligence
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Customer churn risk vectors, tier distribution, segment spend, and satisfaction rating metrics.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Retention Data
              </span>
            </div>

            {/* Dedicated Customer KPI Cards */}
            <CustomerKPICards customerSummary={customerSummary} />

            {/* Customer Visualizations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <CustomerChurnChart churnRiskBreakdown={churnRiskBreakdown} />
              </div>
              <div className="lg:col-span-1">
                <CustomerSegmentChart segmentBreakdown={segmentBreakdown} />
              </div>
              <div className="lg:col-span-1">
                <LoyaltyTierChart loyaltyTierBreakdown={loyaltyTierBreakdown} />
              </div>
            </div>
          </section>
        </main>

        {/* Evidence Drawer Modal */}
        <EvidenceDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          evidence={selectedCitation}
        />
      </div>
    </>
  );
}
