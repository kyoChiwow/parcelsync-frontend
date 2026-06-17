/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAreasQuery,
  useGetDistrictsQuery,
  useGetDivisionsQuery,
} from "@/redux/features/location/location.api";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Plus,
  Settings,
} from "lucide-react";

export default function AddHub() {
  const { data: allDivision, isLoading: allDivisionsLoading } =
    useGetDivisionsQuery(undefined);
  const { data: allArea, isLoading: allAreaLoading } =
    useGetAreasQuery(undefined);
  const { data: allDistrict, isLoading: allDistrictLoading } =
    useGetDistrictsQuery(undefined);

  console.log(allArea, allDivision, allDistrict);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" /> Add Hub
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-150 p-0 overflow-hidden gap-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Add A Hub
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full flex flex-col mt-4 overflow-x-auto">
          <div className="border-b px-4 overflow-x-auto scrollbar-none">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0 gap-4 border-b-0">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
              >
                <LayoutDashboard className="h-4 w-4" />
                Basic Information
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
              >
                <BarChart3 className="h-4 w-4" />
                Select Division
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
              >
                <FileText className="h-4 w-4" />
                Select District
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
              >
                <Settings className="h-4 w-4" />
                Select Area
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content areas with consistent padding and min-height */}
          <div className="p-6 min-h-55 bg-muted/20 text-sm text-muted-foreground leading-relaxed">
            <TabsContent
              value="overview"
              className="mt-0 focus-visible:outline-none"
            >
              <h3 className="text-sm font-medium text-foreground mb-1">
                Hub Configuration
              </h3>
              <p>
                Manage your account preferences and options. Customize your
                experience to fit your needs.
              </p>
            </TabsContent>
            <TabsContent
              value="analytics"
              className="mt-0 focus-visible:outline-none"
            >
              <h3 className="text-sm font-medium text-foreground mb-1">
                Performance Data
              </h3>
              <p>
                Track real-time metrics and monitor your hub data streams
                effortlessly.
              </p>
            </TabsContent>
            <TabsContent
              value="reports"
              className="mt-0 focus-visible:outline-none"
            >
              <h3 className="text-sm font-medium text-foreground mb-1">
                Generated Insights
              </h3>
              <p>
                View and export automated summaries, history logs, and activity
                reports.
              </p>
            </TabsContent>
            <TabsContent
              value="settings"
              className="mt-0 focus-visible:outline-none"
            >
              <h3 className="text-sm font-medium text-foreground mb-1">
                Preferences
              </h3>
              <p>
                Adjust system rules, permissions, hardware connections, and
                safety thresholds.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
