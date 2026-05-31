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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/location/location.api";
import {
  useCreateParcelMutation,
  useGetCompanyQuery,
} from "@/redux/features/user/user.api";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export function AddParcel() {
  const [open, setOpen] = useState(false);
  const { data: divisions, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const { data: getCompanies, isLoading: companyLoading } =
    useGetCompanyQuery(undefined);
  const [createParcel, { isLoading: parcelLoading }] =
    useCreateParcelMutation();

  const companyOptions = getCompanies?.data?.map(
    (item: { _id: string; companyName: string }) => ({
      value: item._id,
      label: item.companyName,
    }),
  );

  const divisionOptions = divisions?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    }),
  );
  console.log(divisionOptions, companyOptions);

  const form = useForm({
    defaultValues: {
      pickUpAddress: "",
      deliveryAddress: "",
      division: "",
      weight: "",
      deliveryCharge: "",
      totalCost: "",
      netCost: "",
      collectionAmount: "",
      paymentMethod: "",
      companyId: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await createParcel(data).unwrap();

      if (res.success) {
        toast.success("Parcel created successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error);
      const serverMessage = error?.data?.message || "Something went wrong!";
      toast.error(serverMessage);
    }
  };

  const paymentOptions = [
    { value: "COD", label: "Cash On Delivery" },
    { value: "PREPAID", label: "Already Paid" },
  ];

  const { setValue, control } = form;

  const division = useWatch({ control, name: "division" });
  const deliveryCharge = useWatch({ control, name: "deliveryCharge" });
  const totalCost = useWatch({ control, name: "totalCost" });

  useEffect(() => {
    if (!division || !divisionOptions) return;

    const selectedDivision = divisionOptions.find(
      (opt: { value: string; label: string }) => opt.value === division,
    );

    if (selectedDivision) {
      const newCharge = selectedDivision.label === "Dhaka" ? "70" : "120";
      setValue("deliveryCharge", newCharge);
    }
  }, [division, divisionOptions, setValue]);

  useEffect(() => {
    const delivery = parseFloat(deliveryCharge) || 0;
    const total = parseFloat(totalCost) || 0;
    const net = total + delivery;

    setValue("netCost", net.toString());
  }, [deliveryCharge, totalCost, setValue]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Parcel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Parcel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            id="create-parcel"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Pickup Address */}
            <FormField
              control={form.control}
              name="pickUpAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Pickup address here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Pickup Addreess */}

            {/* Delivery Address */}
            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Delivery address here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Delivery Address */}

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Weight in grams here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Weight */}

            {/* Division */}
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={divisionLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {divisionOptions?.map(
                        (item: { label: string; value: string }) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Division */}

            {/* Choose Company */}
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Choose Company</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={companyLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companyOptions?.map(
                        (item: { label: string; value: string }) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Choose Company */}

            {/* Delivery Charge */}
            <FormField
              control={form.control}
              name="deliveryCharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Charge</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      type="number"
                      placeholder="Delivery Charge here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Delivery Charge */}

            {/* Total Cost */}
            <FormField
              control={form.control}
              name="totalCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Total Cost here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Total Cost */}

            {/* Collection Amount */}
            <FormField
              control={form.control}
              name="collectionAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Collection Amount here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Collection Amount */}

            {/* Payment Method */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentOptions?.map(
                        (item: { label: string; value: string }) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Payment Method */}

            {/* Net Amount */}
            <FormField
              control={form.control}
              name="netCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Net Amount</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      type="number"
                      placeholder="Net Amount here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Net Amount */}
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="create-parcel" type="submit" disabled={parcelLoading}>
            {parcelLoading ? "Uploading..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
