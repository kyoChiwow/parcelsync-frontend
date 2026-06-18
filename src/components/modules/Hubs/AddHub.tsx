/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddHub() {
  const [open, setOpen] = useState(false);

  const { data: allDivision, isLoading: allDivisionsLoading } =
    useGetDivisionsQuery(undefined);
  const { data: allArea, isLoading: allAreaLoading } =
    useGetAreasQuery(undefined);
  const { data: allDistrict, isLoading: allDistrictLoading } =
    useGetDistrictsQuery(undefined);

  console.log(allArea, allDivision, allDistrict);

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
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        {/* Form Settings */}
        <Form {...form}>
          <form id="create-hub" onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              defaultValue="basic-information"
              className="w-full flex flex-col mt-4 overflow-x-auto"
            >
              {/* Tabs List Here */}
              <div className="border-b px-4 overflow-x-auto scrollbar-none">
                <TabsList className="w-full justify-start h-12 bg-transparent p-0 gap-4 border-b-0">
                  <TabsTrigger
                    value="basic-information"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Basic Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="hubDivision"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Select Division
                  </TabsTrigger>
                  <TabsTrigger
                    value="hubDistrict"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
                  >
                    <FileText className="h-4 w-4" />
                    Select District
                  </TabsTrigger>
                  <TabsTrigger
                    value="hubArea"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
                  >
                    <Settings className="h-4 w-4" />
                    Select Area
                  </TabsTrigger>
                </TabsList>
              </div>
              {/* Tabs List Here */}

              {/* Content area */}
              <div className="p-6 min-h-55 bg-muted/20 text-sm text-muted-foreground leading-relaxed">
                {/* Basic Information Tab */}
                <TabsContent
                  value="basic-information"
                  className="mt-0 focus-visible:outline-none space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="hubName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hub Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Hub name here" {...field} />
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
                        <FormLabel>Hub Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Hub address here" {...field} />
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
                        <FormLabel>Hub Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="Hub contact here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                {/* Basic Information Tab */}

                {/* Division Tab */}
                <TabsContent
                  value="hubDivision"
                  className="mt-0focus-visible:outline-none"
                >
                  <DivisionsComp />
                </TabsContent>
                {/* Division Tab */}

                {/* District Tab */}
                <TabsContent
                  value="hubDistrict"
                  className="mt-0 focus-visible:outline-none"
                >
                  <DistrictsComp />
                </TabsContent>
                {/* District Tab */}

                {/* Area Tab */}
                <TabsContent
                  value="hubArea"
                  className="mt-0 focus-visible:outline-none"
                >
                  <AreasComp />
                </TabsContent>
                {/* Area Tab */}
              </div>
              {/* Content area */}
            </Tabs>
          </form>
        </Form>
        {/* Form Settings */}

        <DialogFooter className="mb-4 mr-5.5">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="create-hub" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
