
import { useState } from "react";
import { Brain, Clock, Users, FileText, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AIMeetingSummaryModalProps {
  children: React.ReactNode;
}

const mockSummary = {
  meetingTitle: "Q4 Strategy Review with TechCorp",
  date: "March 15, 2024",
  duration: "45 minutes",
  participants: ["Sarah Wilson (TechCorp)", "Michael Chen (StartupFlow)", "You"],
  keyPoints: [
    "Discussed Q4 objectives and revenue targets",
    "Reviewed current product roadmap and timeline",
    "Identified potential partnership opportunities",
    "Addressed client concerns about implementation timeline",
  ],
  actionItems: [
    "Send updated proposal by Friday",
    "Schedule follow-up meeting with engineering team",
    "Prepare competitive analysis report",
    "Review contract terms with legal team",
  ],
  sentiment: "Positive",
  nextSteps: "Follow up within 48 hours with detailed proposal and timeline",
};

export function AIMeetingSummaryModal({ children }: AIMeetingSummaryModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSummary = () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Meeting Summary
          </DialogTitle>
          <DialogDescription>
            AI-powered summary of your recent meeting with insights and action items.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meeting Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-slate-500" />
              <span className="font-medium">{mockSummary.meetingTitle}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-slate-500" />
              <span>{mockSummary.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-slate-500" />
              <span>{mockSummary.duration}</span>
            </div>
          </div>

          <Separator />

          {/* Participants */}
          <div>
            <h4 className="font-medium mb-2">Participants</h4>
            <div className="flex flex-wrap gap-2">
              {mockSummary.participants.map((participant, index) => (
                <Badge key={index} variant="secondary">
                  {participant}
                </Badge>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div>
            <h4 className="font-medium mb-2">Key Discussion Points</h4>
            <ul className="space-y-2">
              {mockSummary.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Items */}
          <div>
            <h4 className="font-medium mb-2">Action Items</h4>
            <ul className="space-y-2">
              {mockSummary.actionItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sentiment & Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Meeting Sentiment</h4>
              <Badge className="bg-green-100 text-green-800">
                {mockSummary.sentiment}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Next Steps</h4>
              <p className="text-sm text-slate-600">{mockSummary.nextSteps}</p>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Regenerate Summary
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
