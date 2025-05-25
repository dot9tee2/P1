import { DashboardLayout } from "@/components/DashboardLayout";
import { AddClientForm } from "@/components/AddClientForm";
import { ClientList } from "@/components/ClientList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Clients = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
            <p className="text-slate-600 mt-1">
              Manage your client relationships and interactions.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
              </DialogHeader>
              <AddClientForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <ClientList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
