export type LoginForm = {
  email: string;
  password: string;
};

export type Token = {
  access_token: string;
};

export type UserInfo = {
  email: string;
  name: string;
  lastLogin: Date;
  created: Date;
};

export type LoginResponseOK = {
  token: Token;
  user: UserInfo;
};
