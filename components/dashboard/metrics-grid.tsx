import { FileText, Users, BookOpen, FileCheck, Clock } from "lucide-react"
import { MetricCard } from "@/components/dashboard/metric-card"

interface MetricsGridProps {
  metrics: any
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        title="Total Payers"
        value={metrics.totalPayers.value}
        icon={<FileText className="h-5 w-5 text-primary-600" />}
        change={metrics.totalPayers.change}
        changeType={metrics.totalPayers.changeType}
        period={metrics.totalPayers.period}
        iconBgColor="bg-primary-100"
      />
      <MetricCard
        title="Lives Covered"
        value={`${metrics.livesCovered.value}${metrics.livesCovered.unit}`}
        icon={<Users className="h-5 w-5 text-secondary-600" />}
        change={metrics.livesCovered.change}
        changeUnit={metrics.livesCovered.changeUnit}
        changeType={metrics.livesCovered.changeType}
        period={metrics.livesCovered.period}
        iconBgColor="bg-secondary-100"
        subtitle={`${metrics.totalPolicies.policiesPerPayer} policies per payer`}
      />
      <MetricCard
        title="Total Policies"
        value={metrics.totalPolicies.value}
        icon={<BookOpen className="h-5 w-5 text-blue-600" />}
        subtitle={`${metrics.totalPolicies.policiesPerPayer} policies per payer`}
        iconBgColor="bg-blue-100"
      />
      <MetricCard
        title="Code Coverage"
        value={`${metrics.codeCoverage.value}${metrics.codeCoverage.unit}`}
        icon={<FileCheck className="h-5 w-5 text-purple-600" />}
        change={metrics.codeCoverage.change}
        changeType={metrics.codeCoverage.changeType}
        period={metrics.codeCoverage.period}
        iconBgColor="bg-purple-100"
      />
      <MetricCard
        title="Recent Changes"
        value={metrics.recentChanges.value}
        icon={<Clock className="h-5 w-5 text-gray-700" />}
        change={metrics.recentChanges.change}
        changeType={metrics.recentChanges.changeType}
        period={metrics.recentChanges.period}
        iconBgColor="bg-gray-100"
      />
    </div>
  )
}
