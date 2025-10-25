import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router";
import LoadingSpinner from "@/components/ui/loading";
import toast from "react-hot-toast";

const AuthCallbackPage = () => {
  const { createUserAsync, isCreatingUser } = useUser();
  const { user, isLoading: auth0Loading, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  const hasCreatedUser = useRef(false); // do not trigger when state changes, prevent from re-rendering

  useEffect(() => {
    const handleUserCreation = async () => {
      if (auth0Loading || isCreatingUser) {
        return;
      }

      // Check if we've already attempted to create the user
      if (hasCreatedUser.current) {
        return;
      }

      // Ensure we have the required user data
      if (!user?.sub || !user?.email) {
        console.error("Missing user data from Auth0");
        navigate("/");
        return;
      }

      try {
        hasCreatedUser.current = true;
        await createUserAsync({
          auth0Id: user?.sub,
          email: user?.email,
        });
        navigate("/");
      } catch (error: any) {
        console.error("Error during user creation in auth callback:", error);

        // If user already exists (status 200), that's fine, continue
        if (error?.response?.status === 200) {
          navigate("/");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
          navigate("/error");
        }
      }
    };

    handleUserCreation();
  }, [
    auth0Loading,
    isAuthenticated,
    user,
    createUserAsync,
    isCreatingUser,
    navigate,
  ]);

  return <LoadingSpinner type="fullPage" text="Setting up your account..." />;
};

export default AuthCallbackPage;
