const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const _ = require('lodash');
const Logs = require('../model/Logs');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validationDestination = async (req, res, next) => {
  const schema = {
    type: 'object',
    if: { properties: { transport: { type: 'string', pattern: 'http.' } } },
    then: { required: ['name', 'transport', 'url'] },
    else: { required: ['name', 'transport'] },
    properties: {
      transport: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      url: {
        type: 'string',
        format: 'uri',
      },
    },
    required: ['name', 'transport'],
  };

  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (!valid) {
    const arrError = _.filter(validate.errors, (el) => el.keyword !== 'if');
    const uniqArr = _.unionBy(arrError, 'keyword');
    const result = _.map(uniqArr, (el) => {
      return { path: el.instancePath.slice(1), description: el.message };
    });
    await Logs.createLog(req, { status: 400, body: result });
    res.status(400).json(result);
  } else {
    next();
  }
};

const validationEvent = async (req, res, next) => {
  const schema = {
    type: 'object',
    properties: {
      payload: {
        type: 'object',
      },
      possibleDestinations: {
        type: 'array',
      },
      strategy: {
        type: 'string',
      },
    },

    required: ['payload', 'possibleDestinations'],
  };

  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    const arrError = _.filter(validate.errors, (el) => el.keyword !== 'if');
    const uniqArr = _.unionBy(arrError, 'keyword');
    const result = _.map(uniqArr, (el) => {
      return { path: el.instancePath.slice(1), description: el.message };
    });

    await Logs.createLog(req, { status: 400, body: result });
    res.status(400).json(result);
  } else {
    next();
  }
};

module.exports = {
  validationDestination,
  validationEvent,
};
