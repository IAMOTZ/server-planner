import express from 'express';
import * as controllers from './controllers';

const router = express.Router();

router.get('/ping', controllers.ping);

router.post('/plan', controllers.planServer);

export default router;
