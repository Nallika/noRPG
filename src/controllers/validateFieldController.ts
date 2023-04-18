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

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { field, value } = req.body;
    const { result } = await validateField(field, value);

    res.json(result);
  }
];
