require('dotenv').config();
const _ = require('lodash');

const strategyIsFunction = (strategy) => {
  try {
    const func = eval(strategy)();

    if (func) return true;

    return false;
  } catch (error) {
    return false;
  }
};

const strategyValidation = (strategy) => {
  if (!strategy) return process.env.STRATEGY;

  if (strategyIsFunction(strategy)) {
    return 'USER';
  }

  if (['ALL', 'ANY'].includes(strategy.toUpperCase())) {
    return strategy.toUpperCase();
  }

  return false;
};

const strategyAll = (possibleDestinations) => {
  const destinations = _.reduce(
    possibleDestinations,
    (acc, object) => {
      _.forIn(object, (value, key) => {
        if (value) {
          if (!acc.correct.hasOwnProperty(key)) {
            acc.correct[key] = value;
          }
        }

        if (!value) {
          if (acc.correct.hasOwnProperty(key)) {
            delete acc.correct[key];
          }

          if (!acc.wrong.hasOwnProperty(key)) {
            acc.wrong[key] = value;
          }
        }
      });
      return acc;
    },
    { correct: {}, wrong: {} },
  );

  return destinations;
};

const strategyAny = (possibleDestinations) => {
  const destinations = _.reduce(
    possibleDestinations,
    (acc, object) => {
      _.forIn(object, (value, key) => {
        if (value) {
          if (!acc.correct.hasOwnProperty(key)) {
            acc.correct[key] = value;
          }
        }

        if (!value) {
          if (!acc.wrong.hasOwnProperty(key) && !acc.correct.hasOwnProperty(key)) {
            acc.wrong[key] = value;
          }
        }
      });
      return acc;
    },
    { correct: {}, wrong: {} },
  );

  return destinations;
};

const strategyUser = (possibleDestinations) => {
  const destinations = _.reduce(
    possibleDestinations,
    (acc, object) => {
      _.forIn(object, (value, key) => {
        if (!acc.correct.hasOwnProperty(key)) {
          acc.correct[key] = value;
        }
      });
      return acc;
    },
    { correct: {}, wrong: {} },
  );

  return destinations;
};

module.exports = {
  strategyAll,
  strategyAny,
  strategyUser,
  strategyValidation,
};
