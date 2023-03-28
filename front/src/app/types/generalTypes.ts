/** Here general app types */

export type authType = 'register' | 'login';

export type urlType = 'game' | 'login' | 'register' | 'ladder' | 'newChar';

export type authData = {
  email: string;
  password: string;
  nickname?: string;
}

export type player = {
  token: string;
  nickname: string;
}