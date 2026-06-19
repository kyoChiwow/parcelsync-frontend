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

      <DialogContent className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] sm:max-w-150 p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="p-4 pb-0 sm:p-6 sm:pb-0">
          <DialogTitle className="text-lg sm:text-xl font-semibold tracking-tight">
            Add A Hub
          </DialogTitle>
        </DialogHeader>

        {/* Form Settings */}
        <Form {...form}>
          <form
            id="create-hub"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 overflow-hidden mt-4"
          >
            <Tabs
              defaultValue="basic-information"
              className="w-full flex flex-col flex-1 overflow-hidden"
            >
              {/* Tabs List Here */}
              <div className="border-b px-2 sm:px-4 overflow-x-auto scrollbar-none">
                <TabsList className="w-full justify-start h-auto sm:h-12 bg-transparent p-0 gap-2 sm:gap-4 border-b-0">
                  <TabsTrigger
                    value="basic-information"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-1 sm:gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium text-xs sm:text-sm whitespace-nowrap"
                  >
                    <LayoutDashboard className="h-4 w-4 shrink-0" />
                    <span>Basic</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="hubDivision"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-1 sm:gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium text-xs sm:text-sm whitespace-nowrap"
                  >
                    <BarChart3 className="h-4 w-4 shrink-0" />
                    <span>Division</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="hubDistrict"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-1 sm:gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium text-xs sm:text-sm whitespace-nowrap"
                  >
                    <FileText className="h-4 w-4 shrink-0" />
                    <span>District</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="hubArea"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 gap-1 sm:gap-2 text-muted-foreground data-[state=active]:text-foreground font-medium text-xs sm:text-sm whitespace-nowrap"
                  >
                    <Settings className="h-4 w-4 shrink-0" />
                    <span>Area</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              {/* Tabs List Here */}

              {/* Content area */}
              <div className="p-4 sm:p-6 min-h-55 bg-muted/20 text-sm text-muted-foreground leading-relaxed overflow-y-auto flex-1">
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
                  className="mt-0 focus-visible:outline-none"
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

        <DialogFooter className="p-4 sm:mb-4 sm:mr-5.5 sm:p-0 gap-2 flex-row sm:flex-row">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 sm:flex-none">
              Cancel
            </Button>
          </DialogClose>
          <Button
            form="create-hub"
            type="submit"
            className="flex-1 sm:flex-none"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
