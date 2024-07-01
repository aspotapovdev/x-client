export enum SIGN_UP_FIELD_NAMES {
  name = 'name',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
  dobDay = 'dobDay',
  dobMonth = 'dobMonth',
  dobYear = 'dobYear',
  gender = 'gender',
  avatar = 'avatar',
}

type GENDER = 'male' | 'female';

export interface SignUpFormValues {
  [SIGN_UP_FIELD_NAMES.name]: string;
  [SIGN_UP_FIELD_NAMES.email]: string;
  [SIGN_UP_FIELD_NAMES.password]: string;
  [SIGN_UP_FIELD_NAMES.confirmPassword]: string;
  [SIGN_UP_FIELD_NAMES.dobDay]: number;
  [SIGN_UP_FIELD_NAMES.dobMonth]: number;
  [SIGN_UP_FIELD_NAMES.dobYear]: number;
  [SIGN_UP_FIELD_NAMES.gender]: GENDER;
  [SIGN_UP_FIELD_NAMES.avatar]: File;
}

export interface SignUpDTO {
  [SIGN_UP_FIELD_NAMES.name]: string;
  [SIGN_UP_FIELD_NAMES.email]: string;
  [SIGN_UP_FIELD_NAMES.password]: string;
  [SIGN_UP_FIELD_NAMES.gender]: GENDER;
  [SIGN_UP_FIELD_NAMES.avatar]: File;
  dateOfBirth: string;
}

export enum SIGN_IN_FIELD_NAMES {
  email = 'email',
  password = 'password',
}

export interface SignInFormValues {
  [SIGN_IN_FIELD_NAMES.email]: string;
  [SIGN_IN_FIELD_NAMES.password]: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: GENDER;
  avatar: string;
  age: number;
}

export enum CHANGE_PASSWORD_FIELD_NAMES {
  oldPassword = 'oldPassword',
  newPassword = 'newPassword',
  confirmPassword = 'confirmPassword',
}

export interface ChangePasswordFormValues {
  [CHANGE_PASSWORD_FIELD_NAMES.oldPassword]: string;
  [CHANGE_PASSWORD_FIELD_NAMES.newPassword]: string;
  [CHANGE_PASSWORD_FIELD_NAMES.confirmPassword]: string;
}

export interface ChangePasswordDTO {
  [CHANGE_PASSWORD_FIELD_NAMES.oldPassword]: string;
  [CHANGE_PASSWORD_FIELD_NAMES.newPassword]: string;
}

export interface ServerFieldsError {
  data: {
    errors: {
      [key: string]: string;
    };
  };
}

export enum EDIT_PROFILE_FIELD_NAMES {
  name = 'name',
  avatar = 'avatar',
}

export interface EditProfileFormValues {
  [EDIT_PROFILE_FIELD_NAMES.name]: string;
  [EDIT_PROFILE_FIELD_NAMES.avatar]?: File;
}
