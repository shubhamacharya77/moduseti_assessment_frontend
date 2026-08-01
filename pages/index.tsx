import React, { useState } from 'react';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { UploadDropzone } from '@/upload/UploadDropzone';
import { ExecutiveKPICards } from '@/charts/ExecutiveKPICards';
import { RevenueTrendChart } from '@/charts/RevenueTrendChart';
import { CustomerChurnChart } from '@/charts/CustomerChurnChart';
import { StrategicRecommendationCard } from '@/components/StrategicRecommendationCard';
import { EvidenceDrawer, EvidenceDrawerItem } from '@/components/EvidenceDrawer';
import { GroundedChatDrawer } from '@/chat/GroundedChatDrawer';

const BACKEND_URL = 'http://localhost:8000';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<EvidenceDrawerItem | null>(null);

  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyData, setStrategyData] = useState<any>(null);

  // Fetch Dashboard Metrics using React Query
  const { data: metricsData, refetch, isError } = useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/metrics`);
      if (!res.ok) throw new Error('Failed to fetch dashboard metrics');
      return res.json();
    },
  });

  const salesSummary = metricsData?.metrics?.sales_summary || {};
  const customerSummary = metricsData?.metrics?.customer_summary || {};
  const monthlyTrends = salesSummary?.monthly_revenue_trends || {};
  const churnRiskBreakdown = customerSummary?.churn_risk_breakdown || {};

  const handleSelectCitation = (citation: any) => {
    setSelectedCitation(citation);
    setIsDrawerOpen(true);
  };

  const handleGenerateStrategy = async () => {
    setIsGeneratingStrategy(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: 'What high-priority strategic transformation recommendations should we execute?',
        }),
      });

      if (!res.ok) throw new Error('Strategy generation failed');
      const data = await res.json();
      setStrategyData(data);
    } catch (err: any) {
      console.error('Error generating strategy:', err);
    } finally {
      setIsGeneratingStrategy(false);
    }
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
          onToggleChat={() => setIsChatOpen(true)}
          onRefresh={() => refetch()}
          isBackendConnected={!isError}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Hero Header */}
          <Header
            onGenerateStrategy={handleGenerateStrategy}
            isGenerating={isGeneratingStrategy}
          />

          {/* Multi-Modal File Upload Dropzone */}
          <UploadDropzone
            onUploadSuccess={() => refetch()}
            backendUrl={BACKEND_URL}
          />

          {/* Executive KPI Summary Cards */}
          <ExecutiveKPICards
            salesSummary={salesSummary}
            customerSummary={customerSummary}
          />

          {/* Recharts Data Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueTrendChart monthlyTrends={monthlyTrends} />
            <CustomerChurnChart churnRiskBreakdown={churnRiskBreakdown} />
          </div>

          {/* Strategic Recommendation View (Rendered when strategy generated) */}
          {strategyData?.strategic_response && (
            <div className="my-8">
              <h2 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
                Strategic Intelligence Playbook
              </h2>
              <StrategicRecommendationCard
                strategicIssues={strategyData.strategic_response.strategic_issues || []}
                recommendation={strategyData.strategic_response.recommendation || ''}
                businessImpact={strategyData.strategic_response.business_impact || ''}
                priority={strategyData.strategic_response.priority || 'High'}
                expectedOutcome={strategyData.strategic_response.expected_outcome || ''}
                citations={strategyData.evidence_package?.items || []}
                onSelectCitation={handleSelectCitation}
              />
            </div>
          )}
        </main>

        {/* Evidence Drawer Modal */}
        <EvidenceDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          evidence={selectedCitation}
        />

        {/* Grounded Executive AI Chat Drawer */}
        <GroundedChatDrawer
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onSelectCitation={handleSelectCitation}
          backendUrl={BACKEND_URL}
        />
      </div>
    </>
  );
}
