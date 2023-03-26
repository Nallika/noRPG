import { race, weapon, armor } from "./gameTypes";

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

export type gameData = {
  races: race[] | any,
  weapons: weapon[],
  armor: armor[],
}
