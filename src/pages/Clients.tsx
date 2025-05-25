
import { DashboardLayout } from "@/components/DashboardLayout";

const Clients = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-600 mt-1">
            Manage your client relationships and interactions.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg border border-slate-200">
          <p className="text-slate-500">Clients page content coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
