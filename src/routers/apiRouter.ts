import express from 'express';
import { register, login, auth } from '../controllers/playerController';
import { validate } from '../controllers/validateFieldController';
import { addNewChar } from '../controllers/charController';
import { ladder } from '../controllers/ladderController';
import { races, items } from '../controllers/initParamsController';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/player', auth);

router.get('/validate', validate);

router.post('/newChar', addNewChar);

router.get('/ladder', ladder);

router.get('/races', races);

router.get('/items', items);

export default router;
