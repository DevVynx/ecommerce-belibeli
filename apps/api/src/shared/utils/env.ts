export function getEnvOrThrow(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(`Env ${name} está vazio ou não definido`);
  }

  return value;
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  DATABASE_URL: getEnvOrThrow("DATABASE_URL"), // Obrigatório
  JWT_ACCESS_SECRET: getEnvOrThrow("JWT_ACCESS_SECRET"), // Obrigatório
  JWT_REFRESH_SECRET: getEnvOrThrow("JWT_REFRESH_SECRET"), // Obrigatório
  SHIPPING_ORIGIN_CEP: getEnvOrThrow("SHIPPING_ORIGIN_CEP"), // Obrigatório

  // Opcionais ou tolerantes para o primeiro deploy:
  IP_ADDRESS: process.env.IP_ADDRESS || "localhost",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  CLOUDINARY_URL: process.env.CLOUDINARY_URL || "",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
  RESEND_KEY: process.env.RESEND_KEY || "",
};
