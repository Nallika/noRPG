import express from 'express';

import { getItems } from '../components/game/itemsModel';
import { getRaces } from '../components/game/racesModel';
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