import express from 'express';
import logger from 'morgan';
import routes from './routes';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(logger('combined'));
} else app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

export default app;
