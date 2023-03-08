import express from 'express';
import { register } from '../controllers/registrationController';
import { login } from '../controllers/loginController';
import { validate } from '../controllers/validateFieldController';
import { addNewChar } from '../controllers/charController';
import { ladder } from '../controllers/ladderController';


const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/validate', validate);

router.post('/newChar', addNewChar);

router.get('/ladder', ladder);

export default router;
