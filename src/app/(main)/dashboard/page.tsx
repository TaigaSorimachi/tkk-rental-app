import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { UtilizationChart } from "@/components/dashboard/UtilizationChart";
import { LocationRanking } from "@/components/dashboard/LocationRanking";
import { AlertList } from "@/components/dashboard/AlertList";
import { kpiData } from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="月間売上"
          value={`¥${(kpiData.monthlyRevenue.value / 1000000).toFixed(1)}M`}
          change={kpiData.monthlyRevenue.change}
          trend={kpiData.monthlyRevenue.trend}
          type="revenue"
        />
        <KPICard
          title="機材稼働率"
          value={`${kpiData.utilizationRate.value}%`}
          change={kpiData.utilizationRate.change}
          trend={kpiData.utilizationRate.trend}
          type="utilization"
        />
        <KPICard
          title="貸出中機材"
          value={`${kpiData.activeRentals.value}台`}
          change={kpiData.activeRentals.change}
          trend={kpiData.activeRentals.trend}
          type="rentals"
        />
        <KPICard
          title="新規顧客"
          value={`${kpiData.newCustomers.value}社`}
          change={kpiData.newCustomers.change}
          trend={kpiData.newCustomers.trend}
          type="customers"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <UtilizationChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LocationRanking />
        <AlertList />
      </div>
    </div>
  );
}
