import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { DistributionCharts } from "@/components/dashboard/distribution-charts"
import { CodeCoverageStatus } from "@/components/dashboard/code-coverage-status"
import { InsightsSection } from "@/components/dashboard/insights-section"
import { TrendLineChart } from "@/components/dashboard/trend-line-chart"
import { StackedBarChart } from "@/components/dashboard/stacked-bar-chart"
import { RadarChartComponent } from "@/components/dashboard/radar-chart-component"
import { FunnelChart } from "@/components/dashboard/funnel-chart"
import { HeatmapChart } from "@/components/dashboard/heatmap-chart"
import { PolicyEffectivenessChart } from "@/components/dashboard/policy-effectiveness-chart"
import mockData from "@/data/mockData.json"
import { BubbleChart } from "@/components/dashboard/bubble-chart"

export function DashboardContent() {
  // Get chart data from mockData
  const { trendData, stackedBarData, radarData, funnelData, heatmapData } = mockData.dashboard.charts

  return (
    <main className="pt-16 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-md text-gray-600">Analyze payer policies and coverage metrics across your network</p>
      </div>

      <MetricsGrid metrics={mockData.dashboard.metrics} />

      {/* First row of charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DistributionCharts
          payerDistribution={mockData.dashboard.distributions.payerType}
          policyDistribution={mockData.dashboard.distributions.policyByPayerType}
        />
      </div>

      {/* Second row of charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <BubbleChart data={mockData.dashboard.charts.bubbleChartData} title="Policy Distribution by Specialty" />
        <CodeCoverageStatus
          coverage={mockData.dashboard.metrics.codeCoverage}
          filters={mockData.dashboard.filters.codeTypes}
        />
      </div>

      {/* New row with trend line and stacked bar charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <TrendLineChart data={trendData} title="Policy Coverage Trend" timeRange="Last 6 Months" />
        <StackedBarChart data={stackedBarData} title="Policy Status by Quarter" />
      </div>

      {/* New row with radar and funnel charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RadarChartComponent data={radarData} title="Performance Metrics" />
        <FunnelChart data={funnelData} title="Policy Processing Funnel" />
      </div>

      {/* New row with heatmap and policy effectiveness chart */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <HeatmapChart data={heatmapData} title="Policy Activity Heatmap" maxValue={16} />
        <PolicyEffectivenessChart
          data={mockData.dashboard.charts.policyEffectivenessData}
          title="Policy Effectiveness & Adoption"
        />
      </div>

      <InsightsSection insights={mockData.dashboard.insights} />
    </main>
  )
}
