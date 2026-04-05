import React, { createContext, useState, useContext, useEffect } from "react";
import { appParams } from "@/lib/app-params";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const appClient = axios.create({
    baseURL: "/api/apps/public",
    headers: {
      "X-App-Id": appParams.appId,
      ...(appParams.token
        ? { Authorization: `Bearer ${appParams.token}` }
        : {}),
    },
    withCredentials: true,
  });

  const apiClient = axios.create({
    baseURL: "/api",
    headers: {
      ...(appParams.token
        ? { Authorization: `Bearer ${appParams.token}` }
        : {}),
    },
    withCredentials: true,
  });

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);

      try {
        const { data } = await appClient.get(
          `/prod/public-settings/by-id/${appParams.appId}`,
        );
        setAppPublicSettings(data);

        if (appParams.token) {
          await checkUserAuth();
        } else {
          setIsLoadingAuth(false);
          setIsAuthenticated(false);
        }

        setIsLoadingPublicSettings(false);
      } catch (appError) {
        console.error("App state check failed:", appError);

        const status = appError.response?.status;
        const extraReason = appError.response?.data?.extra_data?.reason;
        const message =
          appError.response?.data?.message ||
          appError.message ||
          "Failed to load app";

        if (status === 403 && extraReason) {
          if (extraReason === "auth_required") {
            setAuthError({
              type: "auth_required",
              message: "Authentication required",
            });
          } else if (extraReason === "user_not_registered") {
            setAuthError({
              type: "user_not_registered",
              message: "User not registered for this app",
            });
          } else {
            setAuthError({
              type: extraReason,
              message,
            });
          }
        } else {
          setAuthError({
            type: "unknown",
            message,
          });
        }

        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setAuthError({
        type: "unknown",
        message: error.message || "An unexpected error occurred",
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);

      // Replace this endpoint with your actual “current user” API
      const { data } = await apiClient.get("/auth/me");

      setUser(data);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
    } catch (error) {
      console.error("User auth check failed:", error);
      setIsLoadingAuth(false);
      setIsAuthenticated(false);

      const status = error.response?.status;

      if (status === 401 || status === 403) {
        setAuthError({
          type: "auth_required",
          message: "Authentication required",
        });
      }
    }
  };

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);

    // Optional: call your backend logout endpoint here
    // apiClient.post("/auth/logout").catch(() => {});

    // Token cleanup – adapt to however you store the token
    localStorage.removeItem("auth_token");

    if (shouldRedirect) {
      const returnTo = encodeURIComponent(window.location.href);
      window.location.href = `/login?returnTo=${returnTo}`;
    }
  };

  const navigateToLogin = () => {
    const returnTo = encodeURIComponent(window.location.href);
    window.location.href = `/login?returnTo=${returnTo}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        logout,
        navigateToLogin,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
