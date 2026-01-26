export function getEnvOrThrow(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(`Env ${name} está vazio ou não definido`);
  }

  return value;
}

export const PORT = getEnvOrThrow("PORT");
export const DATABASE_URL = getEnvOrThrow("DATABASE_URL");
export const IP_ADDRESS = getEnvOrThrow("IP_ADDRESS");
export const SHIPPING_ORIGIN_CEP = getEnvOrThrow("SHIPPING_ORIGIN_CEP");
export const JWT_ACCESS_SECRET = getEnvOrThrow("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnvOrThrow("JWT_REFRESH_SECRET");
