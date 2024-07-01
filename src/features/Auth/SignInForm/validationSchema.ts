import * as yup from 'yup';
import { SIGN_IN_FIELD_NAMES } from '@/types';

const validationSchema = yup.object({
  [SIGN_IN_FIELD_NAMES.email]: yup
    .string()
    .email('Неверный Email')
    .required('Email обязателен'),
  [SIGN_IN_FIELD_NAMES.password]: yup
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .required('Пароль обязателен'),
});

export { validationSchema };
