import express from 'express';
import { body, validationResult } from 'express-validator';
import { addNewPlayer, loginPlayer, authPlayer } from '../components/player/playerModel';

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
    const { player, error } = await addNewPlayer(nickname, email, password);

    if (error) {
      res.status(400).json('Registration failed, check data');
      return;
    }

    res.json(player);
  }
];

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
    const { player, error } = await loginPlayer(email, password);

    if (error) {
      res.status(400).json(error);
      return;
    }

    res.json(player);
  }
];

/**
* 
*/
export const auth = [
  async (req:express.Request, res:express.Response) => {
    const token = req.headers["authorization"] as string;

    const { player, error } = authPlayer(token);

    if (error) {
      res.status(300).json('Autentication error');
      return;
    }

    res.json(player);
  }
];
