export type LoginFields = {
  email: string;
  password: string;
};


export type RegisterFields = {
  username: string,
  email: string;
  password: string;
  passwordConfirm: string;
}

export type RegisterResponse = {
  id: string;
  email: string;
}


