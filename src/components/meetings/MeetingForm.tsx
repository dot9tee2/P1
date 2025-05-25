import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const meetingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  scheduled_at: z.string().min(1, "Scheduled date is required"),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

type MeetingFormData = z.infer<typeof meetingSchema>;

interface MeetingFormProps {
  onSuccess?: () => void;
  initialData?: MeetingFormData & { id: number };
}

export function MeetingForm({ onSuccess, initialData }: MeetingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      scheduled_at: "",
      status: "pending",
    },
  });

  const onSubmit = async (data: MeetingFormData) => {
    setIsSubmitting(true);
    try {
      if (initialData) {
        // Update existing meeting
        const { error } = await supabase
          .from("meetings")
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq("id", initialData.id);

        if (error) throw error;
        toast.success("Meeting updated successfully");
      } else {
        // Create new meeting
        const { error } = await supabase.from("meetings").insert([
          {
            ...data,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;
        toast.success("Meeting scheduled successfully");
      }

      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Meeting title"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Meeting description"
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="scheduled_at">Scheduled Date & Time</Label>
        <Input
          id="scheduled_at"
          type="datetime-local"
          {...register("scheduled_at")}
          className={errors.scheduled_at ? "border-red-500" : ""}
        />
        {errors.scheduled_at && (
          <p className="text-sm text-red-500">{errors.scheduled_at.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          defaultValue={initialData?.status || "pending"}
          onValueChange={(value) => setValue("status", value as MeetingFormData["status"])}
        >
          <SelectTrigger className={errors.status ? "border-red-500" : ""}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? "Updating..." : "Scheduling..."}
            </>
          ) : (
            initialData ? "Update Meeting" : "Schedule Meeting"
          )}
        </Button>
      </div>
    </form>
  );
} 