export type user = {
  token: string;
  nickname: string;
}

export type authType = 'register' | 'login';

export type authData = {
  email: string;
  password: string;
  nickname?: string;
}