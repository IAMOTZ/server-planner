import simpleNodeLogger from 'simple-node-logger';
import serverPlanner from './service';
import validation from './validation';

const log = simpleNodeLogger.createSimpleLogger();

/**
 * @function ping
 * @description Controller - Indicates that the server is alive
 * @param {Object} req Express reqeust object
 * @param {Object} res Express response object
 * @returns {undefined}
 */
export const ping = (req, res) => {
  res.status(200).json({
    ok: true, message: 'Server is Alive',
  });
};

/**
 * @function planServer
 * @description Controller - Validates incoming reqeust and calls the serverPlanner
 * service with the right data
 * @param {Object} req Express reqeust object
 * @param {Object} res Express response object
 * @returns {undefined}
 */
export const planServer = (req, res) => {
  log.debug('Validating reqeust data');
  const validationResult = validation.validateServerPlanningRequest(req.body);
  if (!validationResult.valid) {
    log.debug('Request data is not valid');
    res.status(401).json({
      ok: false, errors: validationResult.error,
    });
    return;
  }
  log.debug('Request data is valid, calling server planner service');
  const result = serverPlanner(validationResult.data);
  res.status(200).json({
    ok: true, data: result,
  });
};
