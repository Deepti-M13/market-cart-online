
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  cardCvv: z.string().min(3, "CVV is required").max(4),
});

type CheckoutFormData = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  paymentMethod: "card" | "cod";
}

export const CheckoutForm = ({ onSubmit, paymentMethod }: CheckoutFormProps) => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardCvv: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP Code</FormLabel>
              <FormControl>
                <Input placeholder="ZIP Code" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {paymentMethod === "card" && (
          <FormField
            control={form.control}
            name="cardCvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input type="password" maxLength={4} placeholder="CVV" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button 
          type="submit" 
          className="w-full bg-farm-green hover:bg-farm-green/90"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>Processing...</>
          ) : (
            <>
              {paymentMethod === "card" ? (
                <CreditCard className="mr-2 h-5 w-5" />
              ) : (
                <DollarSign className="mr-2 h-5 w-5" />
              )}
              Complete Order
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
