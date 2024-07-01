import * as yup from 'yup';
import { CHANGE_PASSWORD_FIELD_NAMES } from '@/types';

export const validationSchema = yup
  .object({
    [CHANGE_PASSWORD_FIELD_NAMES.oldPassword]: yup
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Пароль обязателен'),
    [CHANGE_PASSWORD_FIELD_NAMES.newPassword]: yup
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Пароль обязателен'),
    [CHANGE_PASSWORD_FIELD_NAMES.confirmPassword]: yup
      .string()
      .oneOf(
        [yup.ref(CHANGE_PASSWORD_FIELD_NAMES.confirmPassword)],
        'Пароли должны совпадать'
      )
      .required('Подтверждение пароля обязательно'),
  })
  .required();
