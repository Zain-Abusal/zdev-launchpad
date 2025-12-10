import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoaded, isSignedIn } = useClerkAuth();

  useEffect(() => {
    if (!isLoaded) return;
    const redirectTo = searchParams.get("redirect_to") || "/";
    navigate(isSignedIn ? redirectTo : "/auth/sign-in", { replace: true });
  }, [isLoaded, isSignedIn, navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Completing sign in...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we redirect you.
        </p>
      </div>
    </div>
  );
};

export default Callback;
