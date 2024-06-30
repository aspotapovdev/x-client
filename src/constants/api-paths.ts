export const API_HOST = import.meta.env.VITE_API_HOST;

export const API_PATHS = Object.freeze({
  register: `${API_HOST}/auth/register`,
  verifyEmail: `${API_HOST}/auth/verify-email`,
});
