import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

import { ENV } from "@/shared/utils/env";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
      <div>{children}</div>
    </GoogleOAuthProvider>
  );
}
