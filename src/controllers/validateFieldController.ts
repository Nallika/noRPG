import express from 'express';
import { body, validationResult } from 'express-validator';
import { validateField } from '../components/common/validationModel';

/**
 * 
 */
export const validate = [
  body('field', 'wrong field').escape()
    .exists({checkFalsy: true})
    .matches(/^(nick|email|name)$/),
  body('value', 'value is empty').isString().not().isEmpty().trim().escape(),

  async (req:express.Request, res:express.Response) => {
    const validationErrors = validationResult(req);
    console.log('validate controller ', req.body);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { field, value } = req.body;
    const { result, error } = validateField(field, value);

    if (error) {
      res.status(400).json(error);
      return;
    }

    res.json(result);
  }
];
