import { SIGN_UP_FIELD_NAMES, SignUpDTO, SignUpFormValues } from '@/types';
import { AvatarUpload } from '@components/AvatarUpload';
import { Button } from '@components/Button';
import { RadioGroup } from '@components/RadioGroup';
import { Select } from '@components/Select';
import { TextField } from '@components/TextField';
import { Dialog } from '@components/Dialog';
import { validationSchema } from '@features/Auth/SignUpForm/validationSchema.ts';
import { ServerError, AuthService } from '@services/AuthService.ts';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PulseLoader } from 'react-spinners';

const months = [
  { value: '01', label: 'Январь' },
  { value: '02', label: 'Февраль' },
  { value: '03', label: 'Март' },
  { value: '04', label: 'Апрель' },
  { value: '05', label: 'Май' },
  { value: '06', label: 'Июнь' },
  { value: '07', label: 'Июль' },
  { value: '08', label: 'Август' },
  { value: '09', label: 'Сентябрь' },
  { value: '10', label: 'Октябрь' },
  { value: '11', label: 'Ноябрь' },
  { value: '12', label: 'Декабрь' },
];

const genders = [
  {
    value: 'male',
    label: 'Мужской',
  },
  {
    value: 'female',
    label: 'Женский',
  },
];

interface SignUpFormProps {}

export const SignUpForm: FC<SignUpFormProps> = () => {
  const {
    handleSubmit,
    register,
    control,
    formState,
    setValue,
    setError,
    reset,
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const onSubmit = async (data: SignUpFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, dobYear, dobMonth, dobDay, ...rest } = data;
    const submitData = { ...rest } as SignUpDTO;
    const paddedMonth = String(dobMonth).padStart(2, '0');
    const paddedDay = String(dobDay).padStart(2, '0');
    submitData.dateOfBirth = `${dobYear}-${paddedMonth}-${paddedDay}`;

    const formData = new FormData();
    Object.keys(submitData).forEach((key) => {
      const value = submitData[key as keyof typeof submitData];
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      await AuthService.signUp(formData);
      reset();
      setOpenSuccessModal(true);
    } catch (error) {
      const { response } = error as AxiosError<ServerError>;
      if (response?.data?.errors) {
        const { errors } = response.data;
        Object.keys(errors).forEach((key) => {
          if (errors[key]) {
            setError(key as SIGN_UP_FIELD_NAMES, { message: errors[key] });
          }
        });
      }
    }
  };

  return (
    <>
      <form
        className="w-full flex flex-col items-center"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}>
        <AvatarUpload
          errorMessage={errors.avatar?.message}
          setValue={setValue}
          register={register}
          isSuccessfulUpload={isSubmitSuccessful}
        />
        <TextField
          {...register(SIGN_UP_FIELD_NAMES.name)}
          label="Имя"
          placeholder="Иван"
          errorMessage={errors.name?.message}
          required
        />
        <TextField
          {...register(SIGN_UP_FIELD_NAMES.email)}
          classes="mt-6"
          label="Email"
          placeholder="example@gmail.com"
          errorMessage={errors.email?.message}
          required
        />
        <div className="flex flex-col mt-6 w-full">
          <label className="label">
            Пол
            <span className="ml-0.5 text-red-500">*</span>
          </label>
          <RadioGroup
            name={SIGN_UP_FIELD_NAMES.gender}
            control={control}
            options={genders}
            errorMessage={errors.gender?.message}
          />
        </div>
        <div className="flex flex-col mt-6 w-full">
          <label className="label">
            Дата рождения
            <span className="ml-0.5 text-red-500">*</span>
          </label>
          <div className="flex min-h-10">
            <TextField
              {...register(SIGN_UP_FIELD_NAMES.dobDay)}
              classes="max-w-20"
              placeholder="День"
              type="number"
              errorMessage={errors.dobDay?.message}
            />
            <Select
              name={SIGN_UP_FIELD_NAMES.dobMonth}
              control={control}
              options={months}
              placeholder="Месяц"
              classnames="min-w-44 mx-2"
            />
            <TextField
              {...register(SIGN_UP_FIELD_NAMES.dobYear)}
              type="number"
              placeholder="Год"
              errorMessage={errors.dobYear?.message}
              classes="max-w-20"
            />
          </div>
          <TextField
            {...register(SIGN_UP_FIELD_NAMES.password)}
            classes="mt-6"
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            errorMessage={errors.password?.message}
            required
          />
          <TextField
            {...register(SIGN_UP_FIELD_NAMES.confirmPassword)}
            classes="mt-6"
            label="Подтвердите пароль"
            placeholder="Подтвердите пароль"
            type="password"
            errorMessage={errors.confirmPassword?.message}
            required
          />
        </div>
        <Button
          type="submit"
          size="md"
          className="mt-9 self-center min-w-60"
          disabled={isSubmitting}>
          {isSubmitting ? (
            <PulseLoader color="#fff" size={8} />
          ) : (
            'Зарегистрироваться'
          )}
        </Button>
      </form>
      <Dialog
        isOpen={openSuccessModal}
        onRequestClose={() => setOpenSuccessModal(false)}
        title="Успешная регистрация"
        text="На вашу почту отправлено письмо с подтверждением"
      />
    </>
  );
};
