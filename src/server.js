import express from 'express';
import logger from 'morgan';
import routes from './routes';

const app = express();

// @todo: See if there can be a separate logger for production environment
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 7000;

app.use('/', routes);

app.listen(port, () => {
  // @todo: Can I use a standard logger here
  console.log(`App listening on port ${port}`);
});

export default app;
