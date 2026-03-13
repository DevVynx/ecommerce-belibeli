import { OAuth2Client } from "google-auth-library";

import { ENV } from "@/shared/utils/env";

export const client = new OAuth2Client(
  ENV.GOOGLE_CLIENT_ID,
  ENV.GOOGLE_CLIENT_SECRET,
  "postmessage"
);
