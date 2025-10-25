import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "@/components/ui/loading";
import { useGetCurrentUser } from "@/hooks/useUser";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading: auth0Loading } = useAuth0();

  const { data: user, isLoading: userLoading } = useGetCurrentUser();

  // Show loading while checking auth status
  if (auth0Loading || userLoading) {
    return <LoadingSpinner type="fullPage" />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but no user in DB, redirect to auth callback
  if (!user && !userLoading) {
    return <Navigate to="/auth-callback" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
