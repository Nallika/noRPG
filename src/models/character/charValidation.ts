import { char } from '../../types/types';

export const validateChar = (data: char): {isValid: boolean, error: string} => {

  if (!validateRace(data)) {
    return {
      isValid: false,
      error: 'Invalid raceid'
    }
  }

  if (!validateAppearance(data)) {
    return {
      isValid: false,
      error: 'Invalid appearance value'
    }
  }

  if (!validateStats(data)) {
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

const validateRace = (data: char) : boolean => {
  return true;
}

const validateAppearance = (data: char) : boolean => {
  return true;
}

const validateStats = (data: char) : boolean => {
  return true;
}
