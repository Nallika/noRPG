import express from 'express';
import { body, validationResult } from 'express-validator';
import { validateField } from '../models/common/validationModel';

/**
 * 
 */
export const validate = [
  body('email').isEmail().optional(),
  body('name').isEmail().optional(),
  body('nick').isEmail().optional(),

  async (req:express.Request, res:express.Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { email, name, nick } = req.body;
    const field: {[key: string]: string} = {};

    if (email){
      field.email = email;
    } else if (name) {
      field.name = name;
    } else if (nick) {
      field.nick = nick;
    }

    if (Object.keys(field).length === 0) {
      res.status(400).json('Empty field');
      return;
    }

    const { result, error } = validateField(field);

    if (error) {
      res.status(400).json(error);
      return;
    }

    res.json(result);
  }
];
