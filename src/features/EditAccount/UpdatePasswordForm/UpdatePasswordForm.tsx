import {
  CHANGE_PASSWORD_FIELD_NAMES,
  ChangePasswordFormValues,
  ServerFieldsError,
} from '@/types';
import { Button } from '@components/Button';
import { Dialog } from '@components/Dialog';
import { TextField } from '@components/TextField';
import { PulseLoader } from 'react-spinners';
import { validationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '@/services/UserService';

interface UpdatePasswordFormProps {}

export const UpdatePasswordForm: FC<UpdatePasswordFormProps> = () => {
  const { handleSubmit, register, formState, setError, reset } =
    useForm<ChangePasswordFormValues>({
      resolver: yupResolver(validationSchema),
    });
  const { errors, isSubmitting } = formState;
  const [changePassword, { data, isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const onSubmit = async (data: ChangePasswordFormValues) => {
    await changePassword(data);
  };

  const handleCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpenSuccessModal(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      const apiError = error as ServerFieldsError;
      const serverErrors = apiError.data.errors;
      Object.keys(serverErrors).forEach((key) => {
        if (serverErrors[key]) {
          setError(key as CHANGE_PASSWORD_FIELD_NAMES, {
            message: serverErrors[key],
          });
        }
      });
    }
  }, [data, error, isError, setError]);

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold">Изменить пароль</h2>
      <TextField
        {...register(CHANGE_PASSWORD_FIELD_NAMES.oldPassword)}
        classes="mt-6"
        label="Старый пароль"
        placeholder="Введите старый пароль"
        type="password"
        errorMessage={errors.oldPassword?.message}
        required
      />
      <TextField
        {...register(CHANGE_PASSWORD_FIELD_NAMES.newPassword)}
        classes="mt-6"
        label="Новый пароль"
        placeholder="Введите новый пароль"
        type="password"
        errorMessage={errors.newPassword?.message}
        required
      />
      <TextField
        {...register(CHANGE_PASSWORD_FIELD_NAMES.confirmPassword)}
        classes="mt-6"
        label="Повторите новый пароль"
        placeholder="Повторите новый пароль"
        type="password"
        errorMessage={errors.confirmPassword?.message}
        required
      />
      <Button
        type="submit"
        size="md"
        className="mt-9 self-center min-w-60"
        disabled={isSubmitting || isLoading}>
        {isSubmitting ? <PulseLoader color="#fff" size={8} /> : 'Сохранить'}
      </Button>
      {isOpenSuccessModal && (
        <Dialog
          isOpen={isOpenSuccessModal}
          onRequestClose={handleCloseSuccessModal}
          title="Пароль успешно изменен"
        />
      )}
    </form>
  );
};
