export const API_HOST = import.meta.env.VITE_API_HOST;

export const API_PATHS = Object.freeze({
  register: `${API_HOST}/auth/register`,
  verifyEmail: `${API_HOST}/auth/verify-email`,
  login: `${API_HOST}/auth/login`,
  getMe: `${API_HOST}/users/me`,
  changePassword: `${API_HOST}/users/change-password`,
  updateProfile: `${API_HOST}/users/update`,
  getAllUsers: `${API_HOST}/users/all`,
});
