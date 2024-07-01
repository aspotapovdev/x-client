import { EDIT_PROFILE_FIELD_NAMES, EditProfileFormValues, User } from '@/types';
import { AvatarUpload } from '@components/AvatarUpload';
import { Button } from '@components/Button';
import { TextField } from '@components/TextField';
import { validationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateProfileMutation } from '@services/UserService.ts';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';

interface EditUserDataFormProps {
  user: User;
}

export const EditProfileForm: FC<EditUserDataFormProps> = ({ user }) => {
  const { register, setValue, handleSubmit, formState } =
    useForm<EditProfileFormValues>({
      defaultValues: {
        [EDIT_PROFILE_FIELD_NAMES.name]: user.name,
      },
      resolver: yupResolver(validationSchema),
    });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = async (data: EditProfileFormValues) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data];
      if (value) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      }
    });
    await updateProfile(formData);
  };

  return (
    <div className="flex flex-col">
      <form
        className="w-full flex flex-col items-center"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}>
        <AvatarUpload
          register={register}
          setValue={setValue}
          isSuccessfulUpload={isSubmitSuccessful}
          fieldName={EDIT_PROFILE_FIELD_NAMES.avatar}
          initialAvatarUrl={user.avatar}
          errorMessage={errors.avatar?.message}
          isEditable
        />
        <TextField
          {...register(EDIT_PROFILE_FIELD_NAMES.name)}
          label="Имя"
          placeholder="Иван"
          errorMessage={errors.name?.message}
          required
        />
        <Button
          type="submit"
          size="md"
          className="mt-9 self-center min-w-60"
          disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? (
            <PulseLoader color="#fff" size={8} />
          ) : (
            'Сохранить изменения'
          )}
        </Button>
      </form>
    </div>
  );
};
