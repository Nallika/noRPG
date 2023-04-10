import express from 'express';
import { query } from 'express-validator';
import { getLadder } from '../components/ladder/ladderModel';

/**
 * 
 */
export const ladder = [
  query('page').isNumeric(),
  
  async (req:express.Request, res:express.Response) => {
    const { page } = req.query as any as {page: number};
    const { ladder, isFull, error } = getLadder(page);

    if (error) {
      res.status(400).json(error);
      return;
    }

    res.json({ladder, isFull});
  }
];