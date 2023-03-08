import express from 'express';
import { getLadder } from '../components/ladder/ladderModel';

/**
 * 
 */
export const ladder = async (req:express.Request, res:express.Response) => {

  const { result, error } = getLadder();

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.json(result);
};