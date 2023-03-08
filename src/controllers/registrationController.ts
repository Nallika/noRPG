import express from 'express';
import { body, validationResult } from 'express-validator';
import { addNewPlayer } from '../components/player/registrationModel';

/**
 * 
 */
export const register = [
  body('nickname').isString().not().isEmpty().trim().escape(),
  body('email').isString().not().isEmpty().trim().escape(),
  body('password').isString().not().isEmpty().trim().escape(),

  async (req:express.Request, res:express.Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { nickname, email, password } = req.body;
    const { result, error } = await addNewPlayer(nickname, email, password);

    if (error) {
      res.status(400).json(error);
      return;
    }

    res.json(result);
  }
];
