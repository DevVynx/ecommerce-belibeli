export function getEnvOrThrow(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(`Env ${name} está vazio ou não definido`);
  }

  return value;
}

export const JWT_ACCESS_SECRET = getEnvOrThrow("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnvOrThrow("JWT_REFRESH_SECRET");
export const IP_ADDRESS = getEnvOrThrow("IP_ADDRESS");
