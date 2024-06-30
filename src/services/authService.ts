import api from './api';
import { API_PATHS } from '@constants/api-paths.ts';

export const signUp = async (formData: FormData) => {
  try {
    const response = await api.post(API_PATHS.register, formData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmEmail = async (token: string) => {
  try {
    const response = await api.get(`${API_PATHS.verifyEmail}/${token}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
