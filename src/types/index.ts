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
