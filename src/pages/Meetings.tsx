
import { DashboardLayout } from "@/components/DashboardLayout";

const Meetings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meetings</h1>
          <p className="text-slate-600 mt-1">
            Schedule and manage your client meetings.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg border border-slate-200">
          <p className="text-slate-500">Meetings page content coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Meetings;
