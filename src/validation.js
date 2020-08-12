import joi from 'joi';

const serverSchema = joi.object({
  CPU: joi.number().required(),
  RAM: joi.number().required(),
  HDD: joi.number().required(),
});

const requestDataSchema = joi.object({
  serverType: serverSchema.required(),
  virtualMachines: joi.array().items(serverSchema).min(1).required(),
}).required();

const validateServerPlanningRequest = (requestData) => {
  const result = requestDataSchema.validate(requestData, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    skipFunctions: true,
  });

  if (result.error) return { valid: false, error: result.error };
  return { valid: true, data: result };
};

export default {
  validateServerPlanningRequest,
};
