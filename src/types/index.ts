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

export interface SignUpFormValues {
  [SIGN_UP_FIELD_NAMES.name]: string;
  [SIGN_UP_FIELD_NAMES.email]: string;
  [SIGN_UP_FIELD_NAMES.password]: string;
  [SIGN_UP_FIELD_NAMES.confirmPassword]: string;
  [SIGN_UP_FIELD_NAMES.dobDay]: string;
  [SIGN_UP_FIELD_NAMES.dobMonth]: string;
  [SIGN_UP_FIELD_NAMES.dobYear]: string;
  [SIGN_UP_FIELD_NAMES.gender]: 'male' | 'female';
  [SIGN_UP_FIELD_NAMES.avatar]: FileList;
  dateOfBirth: string;
}
