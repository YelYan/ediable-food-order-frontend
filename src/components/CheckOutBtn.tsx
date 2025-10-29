import { useLocation } from "react-router";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./ui/loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, User } from "lucide-react";
import { useGetCurrentUser } from "@/hooks/useUser";

// Zod validation schema
const profileFormSchema = z.object({
  name: z
    .string()
    .max(50, "Name must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  addressLine1: z
    .string()
    .max(100, "Address must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .max(50, "City must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .max(50, "Country must be less than 50 characters")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

type Props = {
  onCheckOut: (userFormData: ProfileFormValues) => void;
  disabled: boolean;
};

const CheckOutBtn = ({ disabled }: Props) => {
  const {
    isAuthenticated,
    isLoading: auth0Loading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();
  const { data: currentUser } = useGetCurrentUser();
  // Initialize form with react-hook-form and zod
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      city: "",
      country: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log(data);
  };

  // after user login in details page , we will redirect to details
  const onLogin = async () => {
    loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button variant={"primary"} onClick={onLogin} className="w-full">
        Login to check out
      </Button>
    );
  }

  if (auth0Loading || !currentUser) {
    return <LoadingSpinner type="simple" />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant={"primary"} className="w-full">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px]">
        <h1 className="text-xl font-bold">Confirm Delivery Details</h1>
        <p>View and change your profile information here</p>

        {/* Profile Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </Label>
              <Input
                type="email"
                value={currentUser?.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your full name"
                      className={"bg-gray-50"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              {/* Address Line 1 Field */}
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your address"
                        className={"bg-gray-50 "}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City Field */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your city"
                        className={"bg-gray-50"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country Field */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your country"
                        className={"bg-gray-50"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" variant={"primary"}>
              Confirm Payment
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutBtn;
