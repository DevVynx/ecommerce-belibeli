import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { productRouter } from "./modules/products/routes.js";
import { authRouter } from "@/modules/auth/routes.js";
import { cartRouter } from "@/modules/cart/routes.js";
import { handleGlobalError } from "@/shared/middlewares/handleGlobalError.js";

const app: Express = express();

// Configs -----------------------------------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.3.14:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);
app.use(
  helmet({
    contentSecurityPolicy: false, // evita quebrar tudo no começo
    crossOriginEmbedderPolicy: false,
  }),
);

// Routes ------------------------------------------------------------
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);

app.use(handleGlobalError);

export default app;
