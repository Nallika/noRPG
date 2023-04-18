import express from 'express';

import { getItems } from '../components/game/itemsModel';
import { getRaces } from '../components/game/racesModel';
import { verifyToken } from './verifyTokenMiddleware';

/**
 * 
 */
export const gameData = [
  verifyToken,

  async (req: express.Request, res: express.Response) => {

    const { weapons, armor, error: itemsError } = await getItems();
    const { races, error: racesError } = await getRaces();

    if (itemsError || racesError) {
      res.status(400).json(itemsError || racesError);
      return;
    }

    res.json({ races, weapons, armor });
  }
];