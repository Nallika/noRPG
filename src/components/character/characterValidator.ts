import { race } from "../game/types";
import { charData } from "./types"


export const validateCharacterData = (charData: charData, race: race) : {isValid: boolean, error: string} => {
  const {minWeight, maxWeight, minHeight, maxHeight} = race;

  if (!validateRace()) {
    return {
      isValid: false,
      error: 'Invalid raceid'
    }
  }

  if (!validateAppearance()) {
    return {
      isValid: false,
      error: 'Invalid appearance value'
    }
  }

  if (!validateStats()) {
    return {
      isValid: false,
      error: 'Invalid stats value'
    }
  }

  return {
    isValid: true,
    error: ''
  }
}

const validateRace = () : boolean => {
  return true;
}

const validateAppearance = () : boolean => {
  return true;
}

const validateStats = () : boolean => {
  return true;
}