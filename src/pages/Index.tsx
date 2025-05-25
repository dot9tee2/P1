
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCards } from "@/components/StatsCards";
import { RecentClients } from "@/components/RecentClients";
import { AIMeetingSummaryModal } from "@/components/AIMeetingSummaryModal";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          <AIMeetingSummaryModal>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Brain className="mr-2 h-4 w-4" />
              AI Meeting Summary
            </Button>
          </AIMeetingSummaryModal>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Recent Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentClients />
          </div>
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Add New Client
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Generate Report
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Meeting with TechCorp completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>New lead from StartupFlow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>AI summary generated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
