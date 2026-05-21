/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useCreateCompanyMutation } from "@/redux/features/user/user.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddCompanyModal() {
  const [open, setOpen] = useState(false);
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const form = useForm({
    defaultValues: {
      companyName: "",
      address: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
        const res = await createCompany(data).unwrap();

        if (res.success) {
            toast.success("Company created successfully!");
            setOpen(false);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Company</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Company</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            id="create-company"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Company address here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            form="create-company"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
