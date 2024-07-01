import * as yup from 'yup';
import { EDIT_PROFILE_FIELD_NAMES } from '@/types';

const validationSchema = yup.object({
  [EDIT_PROFILE_FIELD_NAMES.name]: yup
    .string()
    .min(2, 'Имя обязательно')
    .trim()
    .matches(/^[a-zA-Z ]*$/, 'Имя должно содержать строковое значение')
    .required('Имя обязательно'),
  [EDIT_PROFILE_FIELD_NAMES.avatar]: yup
    .mixed<File>()
    .test('fileSize', 'Файл слишком большой', (value) => {
      return value ? value.size <= 5 * 1048576 : true; // 5 МБ
    })
    .test('fileType', 'Неподдерживаемый тип файла', (value) => {
      return value
        ? ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
        : true;
    }),
});

export { validationSchema };
