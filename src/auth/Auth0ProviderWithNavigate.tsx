import { type ReactNode } from "react";
import { Auth0Provider, User, type AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import Auth0Interceptor from "./Auth0Interceptor";

type Props = {
  children: ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUrl || !audience) {
    throw new Error("Unable to initialise auth");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("USER", user);
    navigate(appState?.returnTo || "/auth-callback");
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUrl,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
      // auth0 solves persistance for us
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <Auth0Interceptor>{children}</Auth0Interceptor>
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
