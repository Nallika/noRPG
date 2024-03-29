import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

import indexRouter from './routers/index';
import apiRouter from './routers/apiRouter';

const app = express();

app.use(express.static('front/dist/no-rpg'));

// Serve static files from the 'src/front/assets' directory
app.use('/assets', express.static('front/app/assets'));

// Serve the Angular app from the 'front/dist/no-rpg' directory
app.use('/', express.static('front/dist/no-rpg'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    'img-src': ['https: data:'],
    'script-src': [''self'', ''unsafe-inline'',]
  }
}));
app.use(compression());
app.use(logger('dev'));

app.use('/api', apiRouter);
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on ${process.env.PORT} ...`);
})
