import express from 'express';
import { body, validationResult } from 'express-validator';

import { addNewCharacter } from '../components/character/charModel';
import { verifyToken } from './verifyTokenMiddleware';

/**
 * 
 */
export const addNewChar = [
  verifyToken,

  body('name').isString().not().isEmpty().trim().escape(),
  body('raceId').isNumeric(),
  body('weaponId').isNumeric(),
  body('armorId').isNumeric(),
  body('height').isNumeric(),
  body('weight').isNumeric(),
  body('strength').isNumeric(),
  body('agility').isNumeric(),
  body('endurance').isNumeric(),
  body('speed').isNumeric(),

  async (req:express.Request, res:express.Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { character, rating, error } = addNewCharacter(req.body, res.locals.user);

    if (error) {
      res.status(400).json(error);
      return;
    }

    res.json({ character, rating });
  }
];