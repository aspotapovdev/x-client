import { SIGN_IN_FIELD_NAMES, SignInFormValues } from '@/types';
import { Button } from '@components/Button';
import { TextField } from '@components/TextField';
import { PATHNAMES } from '@constants/pathnames.ts';
import { AuthService, SingleServerError } from '@services/AuthService';
import { AxiosError } from 'axios';
import { validationSchema } from './validationSchema.ts';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PulseLoader } from 'react-spinners';

interface SignInFormProps {}

export const SignInForm: FC<SignInFormProps> = () => {
  const { handleSubmit, register, formState } = useForm<SignInFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const { errors, isSubmitting } = formState;
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const { token } = await AuthService.login(data);
      AuthService.saveToken(token);
      window.location.href = PATHNAMES.account;
    } catch (error) {
      const { response } = error as AxiosError<SingleServerError>;
      if (response?.data) {
        setServerErrorMessage(response?.data.message);
      }
    }
  };

  return (
    <>
      <form
        className="w-full flex flex-col items-center"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register(SIGN_IN_FIELD_NAMES.email)}
          classes="mt-6"
          label="Email"
          placeholder="example@gmail.com"
          errorMessage={errors.email?.message}
          required
        />
        <TextField
          {...register(SIGN_IN_FIELD_NAMES.password)}
          label="Пароль"
          classes="mt-6"
          placeholder="Введите пароль"
          type="password"
          errorMessage={errors.password?.message}
          required
        />
        {serverErrorMessage && (
          <span className="text-xs text-red-500 mt-6">
            {serverErrorMessage}
          </span>
        )}
        <Button
          type="submit"
          size="lg"
          className="mt-9 self-center min-w-60"
          disabled={isSubmitting}>
          {isSubmitting ? <PulseLoader color="#fff" size={8} /> : 'Войти'}
        </Button>
      </form>
    </>
  );
};
