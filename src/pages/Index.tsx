import { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCards } from "@/components/StatsCards";
import { RecentClients } from "@/components/RecentClients";
import { AIMeetingSummaryModal } from "@/components/AIMeetingSummaryModal";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserPlus, Calendar, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalClients: number;
  activeLeads: number;
  meetingsToday: number;
  conversionRate: number;
}

interface RecentActivity {
  id: number;
  type: "meeting" | "lead" | "client";
  title: string;
  status: string;
  timestamp: string;
}

const Index = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeLeads: 0,
    meetingsToday: 0,
    conversionRate: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Fetch total clients
      const { count: totalClients } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });

      // Fetch active leads
      const { count: activeLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .in("status", ["New", "Contacted", "Qualified"]);

      // Fetch meetings today
      const { count: meetingsToday } = await supabase
        .from("meetings")
        .select("*", { count: "exact", head: true })
        .gte("scheduled_at", today.toISOString())
        .lt("scheduled_at", new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString());

      // Calculate conversion rate
      const { count: convertedLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "Converted");

      const conversionRate = activeLeads ? (convertedLeads / activeLeads) * 100 : 0;

      setStats({
        totalClients: totalClients || 0,
        activeLeads: activeLeads || 0,
        meetingsToday: meetingsToday || 0,
        conversionRate: Number(conversionRate.toFixed(1)),
      });

      // Fetch recent activity
      const { data: recentMeetings } = await supabase
        .from("meetings")
        .select("*")
        .order("scheduled_at", { ascending: false })
        .limit(3);

      const { data: recentLeads } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      const activities: RecentActivity[] = [
        ...(recentMeetings?.map(meeting => ({
          id: meeting.id,
          type: "meeting",
          title: meeting.title,
          status: meeting.status,
          timestamp: meeting.scheduled_at,
        })) || []),
        ...(recentLeads?.map(lead => ({
          id: lead.id,
          type: "lead",
          title: lead.full_name,
          status: lead.status,
          timestamp: lead.created_at,
        })) || []),
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

      setRecentActivity(activities);
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-4 w-[120px] mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
            <CardContent>
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full mb-4" />
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[120px]" />
            </CardHeader>
            <CardContent>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full mb-4" />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[140px]" />
            </CardHeader>
            <CardContent>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full mb-4" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600 mt-1">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
          </div>
          <LoadingSkeleton />
        </div>
      </DashboardLayout>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Clients
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalClients}</div>
              <div className="text-xs text-slate-600 mt-1">
                Active clients in your database
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Active Leads
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-100">
                <UserPlus className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.activeLeads}</div>
              <div className="text-xs text-slate-600 mt-1">
                Leads in your pipeline
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Meetings Today
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-100">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.meetingsToday}</div>
              <div className="text-xs text-slate-600 mt-1">
                Scheduled for today
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Conversion Rate
              </CardTitle>
              <div className="p-2 rounded-lg bg-orange-100">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.conversionRate}%</div>
              <div className="text-xs text-slate-600 mt-1">
                Lead to client conversion
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentClients />
          </div>
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/clients/new">
                  <Button variant="outline" className="w-full justify-start">
                    Add New Client
                  </Button>
                </Link>
                <Link to="/leads/new">
                  <Button variant="outline" className="w-full justify-start">
                    Add New Lead
                  </Button>
                </Link>
                <Link to="/meetings/new">
                  <Button variant="outline" className="w-full justify-start">
                    Schedule Meeting
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={`${activity.type}-${activity.id}`} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "meeting"
                          ? "bg-green-500"
                          : activity.type === "lead"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === "New" || activity.status === "pending"
                          ? "bg-slate-100 text-slate-800"
                          : activity.status === "Contacted" || activity.status === "confirmed"
                          ? "bg-blue-100 text-blue-800"
                          : activity.status === "Qualified"
                          ? "bg-yellow-100 text-yellow-800"
                          : activity.status === "Converted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
