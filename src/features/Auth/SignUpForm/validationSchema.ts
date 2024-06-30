import * as yup from 'yup';
import { SIGN_UP_FIELD_NAMES } from '@/types';

const validationSchema = yup.object({
  [SIGN_UP_FIELD_NAMES.name]: yup
    .string()
    .min(2, 'Имя обязательно')
    .trim()
    .matches(/^[a-zA-Z ]*$/, 'Имя должно содержать строковое значение')
    .required('Имя обязательно'),
  [SIGN_UP_FIELD_NAMES.email]: yup
    .string()
    .email('Неверный Email')
    .required('Email обязателен'),
  [SIGN_UP_FIELD_NAMES.dobDay]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .integer('День рождения должен быть числом')
    .min(1, 'День должен быть больше 0')
    .max(31, 'День должен быть меньше 32')
    .required('День рождения обязателен'),
  [SIGN_UP_FIELD_NAMES.dobMonth]: yup
    .number()
    .required('Месяц рождения обязателен'),
  [SIGN_UP_FIELD_NAMES.dobYear]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .integer('Год должен быть числом')
    .min(1900, 'Год рождения должен быть не ранее 1900')
    .max(new Date().getFullYear(), 'Введите корректный год')
    .required('Год рождения обязателен'),
  [SIGN_UP_FIELD_NAMES.gender]: yup
    .string()
    .oneOf(['male', 'female'], 'Пол обязателен')
    .required('Пол обязателен'),
  [SIGN_UP_FIELD_NAMES.password]: yup
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .required('Пароль обязателен'),
  [SIGN_UP_FIELD_NAMES.confirmPassword]: yup
    .string()
    .oneOf([yup.ref(SIGN_UP_FIELD_NAMES.password)], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
});

export { validationSchema };
