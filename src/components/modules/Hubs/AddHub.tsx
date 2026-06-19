import AreasComp from "@/components/general/AreaComp";
import DistrictsComp from "@/components/general/DistrictComp";
import DivisionsComp from "@/components/general/DivisionComp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  Check,
  FileText,
  MapPin,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const STEPS = [
  {
    value: "basic-information",
    label: "Basic",
    fullLabel: "Basic",
    icon: Building2,
  },
  {
    value: "hubDivision",
    label: "Division",
    fullLabel: "Division",
    icon: BarChart3,
  },
  {
    value: "hubDistrict",
    label: "District",
    fullLabel: "District",
    icon: FileText,
  },
  { value: "hubArea", label: "Area", fullLabel: "Area", icon: MapPin },
] as const;

export default function AddHub() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(STEPS[0].value);

  type HubFormData = {
    hubName: string;
    hubAddress: string;
    hubContact: string;
    hubDivision: string;
    hubDistrict: string;
    hubArea: string;
  };

  const form = useForm<HubFormData>({
    defaultValues: {
      hubName: "",
      hubAddress: "",
      hubContact: "",
      hubDivision: "",
      hubArea: "",
      hubDistrict: "",
    },
  });

  const onSubmit = async (data: HubFormData) => {
    console.log("Submitted Clicked", data);
  };

  const activeIndex = STEPS.findIndex((s) => s.value === activeTab);
  const progressPercent = ((activeIndex + 1) / STEPS.length) * 100;

  const [selectedDivision, selectedDistrict, selectedArea] = useWatch({
    control: form.control,
    name: ["hubDivision", "hubDistrict", "hubArea"],
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setActiveTab(STEPS[0].value);
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" /> Add Hub
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] sm:max-w-150 p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="p-4 pb-3 sm:p-6 sm:pb-4 space-y-3">
          <div className="space-y-1">
            <DialogTitle className="text-lg sm:text-xl font-semibold tracking-tight">
              Add a hub
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Step {activeIndex + 1} of {STEPS.length} &middot;{" "}
              {STEPS[activeIndex].fullLabel}
            </p>
          </div>

          {/* Progress bar — signature element, encodes the real step sequence */}
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            id="create-hub"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full flex flex-col flex-1 overflow-hidden"
            >
              {/* Step tabs */}
              <div className="border-b px-1.5 sm:px-4 overflow-x-auto scrollbar-none">
                <TabsList className="w-full justify-start h-auto bg-transparent p-0 gap-0.5 sm:gap-2 border-b-0">
                  {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const isComplete = index < activeIndex;
                    const isActive = step.value === activeTab;
                    return (
                      <TabsTrigger
                        key={step.value}
                        value={step.value}
                        className={cn(
                          "group relative flex items-center gap-1 sm:gap-1.5 rounded-none border-b-2 border-transparent",
                          "px-1.5 sm:px-3 py-2 sm:py-2.5 text-[11px] sm:text-sm font-medium whitespace-nowrap",
                          "text-muted-foreground transition-colors",
                          "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                          "data-[state=active]:border-primary data-[state=active]:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full text-[9px] sm:text-[10px] transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : isComplete
                                ? "bg-primary/15 text-primary"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {isComplete ? (
                            <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          ) : (
                            <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          )}
                        </span>
                        <span className="sm:hidden">{step.label}</span>
                        <span className="hidden sm:inline">
                          {step.fullLabel}
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Content area */}
              <div className="p-4 sm:p-6 min-h-55 bg-muted/30 leading-relaxed overflow-y-auto flex-1">
                <TabsContent
                  value="basic-information"
                  className="mt-0 focus-visible:outline-none space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="hubName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hub name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Dhanmondi Sorting Hub"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hubAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hub address</FormLabel>
                        <FormControl>
                          <Input placeholder="House, road, area" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hubContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hub contact</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent
                  value="hubDivision"
                  className="mt-0 focus-visible:outline-none"
                >
                  <DivisionsComp
                    selectedDivision={selectedDivision}
                    setValue={form.setValue}
                  />
                </TabsContent>

                <TabsContent
                  value="hubDistrict"
                  className="mt-0 focus-visible:outline-none"
                >
                  <DistrictsComp
                    selectedDistrict={selectedDistrict}
                    setValue={form.setValue}
                  />
                </TabsContent>

                <TabsContent
                  value="hubArea"
                  className="mt-0 focus-visible:outline-none"
                >
                  <AreasComp
                    selectedArea={selectedArea}
                    setValue={form.setValue}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </form>
        </Form>

        <DialogFooter className="border-t p-4 gap-2 flex-row">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 sm:flex-none">
              Cancel
            </Button>
          </DialogClose>
          {activeIndex < STEPS.length - 1 ? (
            <Button
              type="button"
              className="flex-1 sm:flex-none"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(STEPS[activeIndex + 1].value);
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              form="create-hub"
              type="submit"
              className="flex-1 sm:flex-none"
            >
              Create hub
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
