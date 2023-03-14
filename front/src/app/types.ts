export type player = {
  token: string;
  nickname: string;
}

export type authType = 'register' | 'login';

export type urlType = 'game' | 'login' | 'register' | 'ladder';

export type authData = {
  email: string;
  password: string;
  nickname?: string;
}