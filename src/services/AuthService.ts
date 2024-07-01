import { SignInFormValues } from '@/types';
import { AxiosError } from 'axios';
import api from './api';
import { API_PATHS } from '@constants/api-paths.ts';

const LOCAL_STORAGE_TOKEN_KEY = 'token';

export type ServerError = {
  errors: Record<string, string>;
};

export type SingleServerError = {
  message: string;
};

export const AuthService = {
  signUp: async (formData: FormData) => {
    try {
      const response = await api.post(API_PATHS.register, formData);

      return response.data;
    } catch (error) {
      throw error as AxiosError<ServerError>;
    }
  },
  confirmEmail: async (token: string) => {
    try {
      const response = await api.get(`${API_PATHS.verifyEmail}/${token}`);

      return response.data;
    } catch (error) {
      throw error as AxiosError<SingleServerError>;
    }
  },
  login: async (data: SignInFormValues) => {
    try {
      const response = await api.post(API_PATHS.login, data);

      return response.data;
    } catch (error) {
      throw error as AxiosError<SingleServerError>;
    }
  },
  saveToken: (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  },
  getToken: () => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  },
  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    window.location.reload();
  },
};
