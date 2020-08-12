import express from 'express';
import logger from 'morgan';
import simpleNodeLogger from 'simple-node-logger';
import routes from './routes';


const log = simpleNodeLogger.createSimpleLogger();

const app = express();


if (process.env.NODE_ENV === 'production') {
  app.use(logger('combined'));
} else app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 7000;

app.use('/', routes);

app.listen(port, () => {
  log.info(`App listening on port ${port}`);
});

export default app;
