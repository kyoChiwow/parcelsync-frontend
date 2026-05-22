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
import { useState } from "react";
import { useForm } from "react-hook-form";

export function AddParcel() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      pickUpAddress: "",
      deliveryAddress: "",
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
    console.log(data);
  };

  const paymentOptions = [
    { value: "COD", label: "Cash on Delivery" },
    { value: "PREPAID", label: "Already Paid" },
  ];

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

            {/* Delivery Charge */}
            <FormField
              control={form.control}
              name="deliveryCharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Charge</FormLabel>
                  <FormControl>
                    <Input
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
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="create-parcel" type="submit">
            submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
