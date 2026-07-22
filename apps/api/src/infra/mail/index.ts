import { Resend } from "resend";

import { ENV } from "@/shared/utils/env";

export const resend = new Resend(ENV.RESEND_KEY);
