import express from 'express';
import logger from 'morgan';
import dotEnv from 'dotenv';

dotEnv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
