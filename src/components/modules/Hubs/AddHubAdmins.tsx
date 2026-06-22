/* eslint-disable @typescript-eslint/no-explicit-any */
import AllHubAdminsComp from "@/components/general/AllHubAdminsComp";
import AllHubComp from "@/components/general/AllHubComp";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useCreateHubAdminMutation } from "@/redux/features/admin/admin.api";
import { BarChart3, Building2, Check, FileText, MapPin, Plus } from "lucide-react";
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
    value: "hubId",
    label: "Hub",
    fullLabel: "Hub",
    icon: BarChart3,
  },
  {
    value: "userId",
    label: "User",
    fullLabel: "User",
    icon: FileText,
  },
] as const;

export default function AddHubAdmins() {
  const [open, setOpen] = useState(false);
  const [addHubAdmin, { isLoading: hubAdminLoading }] = useCreateHubAdminMutation();
  const [activeTab, setActiveTab] = useState<string>(STEPS[0].value);

  type HubAdminData = {
    hubId: string;
    userId: string;
    phone: string;
    address: string;
  };

  const form = useForm<HubAdminData>({
    defaultValues: {
      hubId: "",
      userId: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const activeIndex = STEPS.findIndex((s) => s.value === activeTab);
  const progressPercent = ((activeIndex + 1) / STEPS.length) * 100;

  const [selectedAdmin, selectedHub] = useWatch({
    control: form.control,
    name: [ "userId", "hubId" ],
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
          <Plus className="h-4 w-4" /> Add Hub Admin
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] sm:max-w-150 p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="p-4 pb-3 sm:p-6 sm:pb-4 space-y-3">
          <div className="space-y-1">
            <DialogTitle className="text-lg sm:text-xl font-semibold tracking-tight">
              Add a hub admin
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
            id="create-hub-admin"
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hub Admin Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 123, Street, City, Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hub Admin Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. +880123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent
                  value="hubId"
                  className="mt-0 focus-visible:outline-none"
                >
                  <AllHubComp
                    selectedHub={ selectedHub }
                    setValue={form.setValue}
                  />
                </TabsContent>

                <TabsContent
                  value="userId"
                  className="mt-0 focus-visible:outline-none"
                >
                  <AllHubAdminsComp
                    selectedAdmin={ selectedAdmin }
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
              form="create-hub-admin"
              type="submit"
              className="flex-1 sm:flex-none"
              disabled={hubAdminLoading}
            >
              {hubAdminLoading ? "Creating..." : "Create Hub Admin"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
