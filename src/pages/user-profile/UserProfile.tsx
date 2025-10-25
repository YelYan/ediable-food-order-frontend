import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";
import LoadingSpinner from "@/components/ui/loading";
import { CheckCircle, Edit2, LogOut, Mail, Save, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetCurrentUser } from "@/hooks/useUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Profile Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          We couldn't find your profile. Please try logging in again.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const { user: auth0User, logout } = useAuth0();
  const { isUpdatingUser, updateUserAsync } = useUser();
  const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUser();

  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleLogout = async () => {
    await logout();
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateUserAsync(data);
      setIsEditMode(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleCancel = () => {
    // Reset form to current user data
    if (currentUser) {
      form.reset({
        name: currentUser.name || "",
        addressLine1: currentUser.addressLine1 || "",
        city: currentUser.city || "",
        country: currentUser.country || "",
      });
    }
    setIsEditMode(false);
  };

  // Initialize form data when user data loads
  useEffect(() => {
    if (currentUser) {
      form.reset({
        name: currentUser.name || "",
        addressLine1: currentUser.addressLine1 || "",
        city: currentUser.city || "",
        country: currentUser.country || "",
      });
    }
  }, [currentUser, form]);

  if (isUserLoading) {
    return <LoadingSpinner type="withText" text="Loading Profile..." />;
  }

  if (!currentUser) {
    return <ProfileNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-3 md:p-6 mb-6 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser?.name
                    ? currentUser.name[0]?.toUpperCase()
                    : currentUser?.email?.[0]?.toUpperCase() ?? ""}
                </div>
                {auth0User?.email_verified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {currentUser?.name || "User Profile"}
                </h1>
                <p className="text-gray-600 text-sm">{currentUser?.email}</p>
              </div>
            </div>
            <Button variant="primary" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid">
          <div className="bg-white rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Information
              </h2>
              {!isEditMode ? (
                <Button onClick={() => setIsEditMode(true)} variant="primary">
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </Button>
                  <Button
                    disabled={isUpdatingUser || !form.formState.isValid}
                    variant="primary"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <Save className="w-4 h-4" />
                    {isUpdatingUser ? (
                      <span>Saving...</span>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Profile Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                  <p className="text-xs text-gray-500">
                    Email cannot be changed
                  </p>
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
                          disabled={!isEditMode}
                          className={
                            !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          disabled={!isEditMode}
                          className={
                            !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
                          }
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
                          disabled={!isEditMode}
                          className={
                            !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
                          }
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
                          disabled={!isEditMode}
                          className={
                            !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
