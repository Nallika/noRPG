import express from 'express';
import { register } from '../controllers/registrationController';
import { login } from '../controllers/loginController';
import { validate } from '../controllers/validateFieldController';

const router = express.Router();

router.post('/register', register);

router.get('/login', login);

router.get('/validate', validate);

export default router;
