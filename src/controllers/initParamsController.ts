import express from 'express';

import { getItems } from '../components/character/itemsModel';
import { getRaces } from '../components/character/racesModel';
import { verifyToken } from './verifyTokenMiddleware';

/**
 * 
 */
export const items = [
  verifyToken,

  async (req:express.Request, res:express.Response) => {

    const { weapons, armor, error } = getItems();

    if (error) {
      res.status(400).json('Error when getting items');
      return;
    }

    res.json({ weapons, armor });
  }
];

/**
 * 
 */
export const races = [
  verifyToken,

  async (req:express.Request, res:express.Response) => {

    const { races, error } = getRaces();

    if (error) {
      res.status(400).json('Error when getting races');
      return;
    }

    res.json({ races });
  }
];