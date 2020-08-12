
import simpleNodeLogger from 'simple-node-logger';
import server from './server';

const log = simpleNodeLogger.createSimpleLogger();

const port = 7000;

server.listen(port, () => {
  log.info(`App listening on port ${port}`);
});
