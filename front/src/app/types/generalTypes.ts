/** Here general app types */

export type authType = 'register' | 'login';

export type urlType = '' | 'game' | 'login' | 'register' | 'ladder' | 'game/charPreview';

export interface loginData {
  email: string;
  password: string;
}

export interface registerData extends loginData {
  nickname: string;
}

export type authData = loginData | registerData;

export type player = {
  token: string;
  nickname: string;
}

export interface popop {
  title: string;
  content: string;
}