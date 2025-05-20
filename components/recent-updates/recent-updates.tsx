"use client"

import mockData from "@/data/mockData.json"
import { cn } from "@/lib/utils"

export function RecentUpdates() {
  const { subtitle, policies, services } = mockData.recentUpdates

  // Limit to only the first 4 policies (plus the Service column = 5 total columns)
  const limitedPolicies = policies.slice(0, 4)

  // Update the policy colors
  const updatedPolicies = limitedPolicies.map((policy, index) => ({
    ...policy,
    bgColor: index % 2 === 0 ? "bg-primary-50" : "bg-blue-50",
  }))

  return (
    <div className="p-8 mt-10">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Service Comparison</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-custom">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="w-1/3 pb-4 text-left text-sm font-medium text-slate-700">Service</th>
                {updatedPolicies.map((policy) => (
                  <th
                    key={policy.id}
                    className={cn(
                      "w-1/6 rounded-md p-3 text-center text-sm font-medium text-slate-700 no-shadow",
                      policy.bgColor,
                    )}
                  >
                    {policy.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="py-4 pr-4">
                    <div className="mb-2 text-sm font-medium text-slate-800">{service.name}</div>
                    <button className="rounded-md bg-purple-50 px-3 py-1 text-[10px] font-medium text-purple-600 hover:bg-purple-100 no-shadow">
                      COMPARE CRITERIA
                    </button>
                  </td>
                  {updatedPolicies.map((policy) => {
                    const status = service.status[policy.id]
                    return (
                      <td key={policy.id} className="py-4 text-center">
                        <div
                          className={cn(
                            "mx-auto inline-block rounded-md border px-4 py-1 text-center text-xs no-shadow",
                            status.type === "covered"
                              ? "border-primary-200 bg-primary-50 text-primary-600"
                              : "border-secondary-200 bg-secondary-50 text-secondary-600",
                          )}
                        >
                          {status.status}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
