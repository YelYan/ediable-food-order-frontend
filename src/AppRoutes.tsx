import { Routes, Route, Navigate } from "react-router";
import { Suspense, lazy } from "react";
import Layout from "./layouts/Layout";
import { FullPageLoader } from "./components/ui/loading";
import ProtectedRoutes from "./auth/ProtectedRoutes";

const LazyHome = lazy(() => import("./pages/home/Home"));
const LazyUserProfile = lazy(() => import("./pages/user-profile/UserProfile"));
const LazyAuthCallback = lazy(() => import("./pages/auth/AuthCallbackPage"));

const loadFunction = () => {
  return <FullPageLoader text="Loading..." />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={loadFunction()}>
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path="/auth-callback"
          element={
            <Suspense fallback={loadFunction()}>
              <LazyAuthCallback />
            </Suspense>
          }
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/user-profile"
            element={
              <Suspense fallback={loadFunction()}>
                <LazyUserProfile />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRoutes;
