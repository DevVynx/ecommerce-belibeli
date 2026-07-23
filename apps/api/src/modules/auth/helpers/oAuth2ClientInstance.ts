import { OAuth2Client } from "google-auth-library";

import { ENV } from "@/shared/utils/env";

export const client = new OAuth2Client({
  client_id: ENV.GOOGLE_CLIENT_ID,
  client_secret: ENV.GOOGLE_CLIENT_SECRET,
  redirectUri: "postmessage",
});
