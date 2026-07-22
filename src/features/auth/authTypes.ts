export type LoginFields = {
  email: string;
  password: string;
};


export type RegisterFields = {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterData extends RegisterFields {
  account_type: string
}