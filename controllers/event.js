require('dotenv').config();
const _ = require('lodash');
const Destinations = require('../model/Destinations');
const Logs = require('../model/Logs');
const { getDestinations, destinationsActions } = require('../services/destination');
const { strategyValidation } = require('../services/strategy');

const index = async (req, res) => {
  const log = await Logs.createLog(req);

  try {
    const body = req.body;
    const strategy = strategyValidation(req.body.strategy);

    if (!strategy) {
      await Logs.updateLog(log._id, { status: 400, body: { description: 'Invalid strategy' } });
      return res.status(400).json({ description: 'Invalid strategy' });
    }

    const { correct, wrong } = getDestinations(body.possibleDestinations, strategy);

    const destinations = [];

    for (let i = 0; i < Object.keys(correct).length; i++) {
      const el = Object.keys(correct)[i];

      const destination = await Destinations.findOne({ name: el });
      if (!destination) {
        delete correct[el];
        wrong[el] = false;
      }

      if (destination) {
        destinations.push(destination);
      }
    }

    const responses = await destinationsActions(destinations, req.body.payload);

    await Logs.updateLog(log._id, { status: 200, body: { ...responses, ...wrong } });

    res.status(200).json({ ...responses, ...wrong });
  } catch (error) {
    await Logs.updateLog(log._id, { status: 500, body: { description: 'Server error' } }, error);
    res.status(500).json({ description: 'Server error' });
  }
};

module.exports = {
  index,
};
