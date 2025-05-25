
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentClients = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    company: "TechCorp Inc.",
    status: "Active",
    lastContact: "2 hours ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@startup.io",
    company: "StartupFlow",
    status: "Lead",
    lastContact: "1 day ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@designstudio.com",
    company: "Design Studio",
    status: "Active",
    lastContact: "3 days ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@enterprise.com",
    company: "Enterprise Solutions",
    status: "Prospect",
    lastContact: "5 days ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa@consulting.org",
    company: "Thompson Consulting",
    status: "Active",
    lastContact: "1 week ago",
    avatar: "/placeholder.svg",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Lead":
      return "bg-blue-100 text-blue-800";
    case "Prospect":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function RecentClients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-900">{client.name}</p>
                  <p className="text-sm text-slate-500">{client.email}</p>
                  <p className="text-xs text-slate-400">{client.company}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(client.status)} variant="secondary">
                  {client.status}
                </Badge>
                <p className="text-xs text-slate-400 mt-1">{client.lastContact}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
