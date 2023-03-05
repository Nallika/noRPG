import express from 'express';
import { body, validationResult } from 'express-validator';
import { loginPlayer } from '../models/registrationModel';

/**
 * 
 */
export const login = [
  body('email').isEmail(),
  body('password').isString().not().isEmpty().trim().escape(),

  async (req:express.Request, res:express.Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { email, password } = req.body;
    const { result, error } = await loginPlayer(email, password);

    if (error) {
      res.status(400).json(error);
      return;
    }

    res.json(result);
  }
];