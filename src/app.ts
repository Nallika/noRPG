import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'

import indexRouter from './routers/index';
import Db from './database/db';

dotenv.config()
const app = express();

app.use(express.static('front/dist/no-rpg'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "img-src": ["https: data:"],
    "script-src": ["'self'", "'unsafe-inline'",]
  }
}));
app.use(compression());
app.use(logger('dev'));

/* add API router */
app.use('/', indexRouter);

Db.getInstance().init();

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on ${process.env.PORT} ...`);
})
