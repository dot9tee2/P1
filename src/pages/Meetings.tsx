import { DashboardLayout } from "@/components/DashboardLayout";
import { MeetingList } from "@/components/meetings/MeetingList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MeetingForm } from "@/components/meetings/MeetingForm";

const Meetings = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Meetings</h1>
            <p className="text-slate-600 mt-1">
              Schedule and manage your client meetings.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
              </DialogHeader>
              <MeetingForm onSuccess={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <MeetingList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Meetings;
