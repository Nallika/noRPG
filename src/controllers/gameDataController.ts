import express from 'express';

import { getItems } from '../components/character/itemsModel';
import { getRaces } from '../components/character/racesModel';
import { verifyToken } from './verifyTokenMiddleware';

/**
 * 
 */
export const gameData = [
  verifyToken,

  async (req:express.Request, res:express.Response) => {

    const { weapons, armor, error: itemsError } = getItems();
    const { races, error: racesError } = getRaces();

    if (itemsError || racesError) {
      res.status(400).json('Error when retrieving data');
      return;
    }

    res.json({ races, weapons, armor });
  }
];