import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { setupAuthInterceptor } from "@/api/api-client";

type Props = {
  children: React.ReactNode;
};

const Auth0Interceptor = ({ children }: Props) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const isInterceptorSetup = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !isInterceptorSetup.current) {
      console.log("Setting up Axios interceptor with Auth0 token.");
      setupAuthInterceptor(getAccessTokenSilently);
      isInterceptorSetup.current = true;
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return <>{children}</>;
};

export default Auth0Interceptor;
