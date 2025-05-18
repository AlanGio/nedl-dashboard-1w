import { TrendingUp } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  benchmark: string | number
  benchmarkLabel: string
  trend?: "up" | "down" | "neutral"
}

function MetricCard({ title, value, benchmark, benchmarkLabel, trend = "neutral" }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100">
          <TrendingUp className="h-5 w-5 text-secondary-500" />
        </div>
        <h3 className="text-base font-medium">{title}</h3>
      </div>
      <div className="mt-2">
        <p className="text-4xl font-bold">{value.toLocaleString()}</p>
        <p className="mt-2 text-sm text-slate-500">
          <span className="font-medium">{benchmark.toLocaleString()}</span> {benchmarkLabel}
        </p>
      </div>
    </div>
  )
}

interface PerformanceSnapshotProps {
  data: {
    cptCodesWithGuidelines: {
      value: number
      benchmark: number
    }
    eiuCptCodes: {
      value: number
      benchmark: number
    }
    servicesDefined: {
      value: number
      benchmark: number
    }
  }
}

export function PerformanceSnapshot({ data }: PerformanceSnapshotProps) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Performance Snapshot</h2>
        <p className="text-sm text-slate-500">Find out how you're doing compared to best-in-class payers.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="CPT Codes with Guidelines"
          value={data.cptCodesWithGuidelines.value}
          benchmark={data.cptCodesWithGuidelines.benchmark}
          benchmarkLabel="is best-in-class"
        />
        <MetricCard
          title="EIU CPT Codes"
          value={data.eiuCptCodes.value}
          benchmark={data.eiuCptCodes.benchmark}
          benchmarkLabel="is best-in-class"
        />
        <MetricCard
          title="Services Defined"
          value={data.servicesDefined.value}
          benchmark={data.servicesDefined.benchmark}
          benchmarkLabel="is best-in-class"
        />
      </div>
    </div>
  )
}
