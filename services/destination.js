const _ = require('lodash');
const axios = require('axios');
const { strategyAll, strategyAny, strategyUser } = require('../services/strategy');

const getDestinations = (possibleDestinations, strategy) => {
  switch (strategy) {
    case 'ALL':
      return strategyAll(possibleDestinations);
    case 'ANY':
      return strategyAny(possibleDestinations);
    case 'USER':
      return strategyUser(possibleDestinations);
  }
};

const destinationsActions = async (destinations, payload) => {
  const responses = {};

  for (let i = 0; i < destinations.length; i++) {
    const destination = destinations[i];

    if (destination.transport.includes('http')) {
      const method = destination.transport.split('.')[1].toUpperCase();
      const config = {
        method,
        url: destination.url,
      };

      if (method === 'GET') {
        config.params = payload;
      } else {
        config.data = payload;
      }

      const result = await axios(config)
        .then((r) => {
          return true;
        })
        .catch((err) => {
          return false;
        });

      responses[destination.name] = result;
      continue;
    }

    if (destination.transport.includes('console')) {
      const comamand = destination.transport.split('.')[1];
      console[comamand](payload);
      responses[destination.name] = true;
    }
  }

  return responses;
};

module.exports = {
  getDestinations,
  destinationsActions,
};
