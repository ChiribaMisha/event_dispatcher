const Destinations = require('../model/Destinations');
const Logs = require('../model/Logs');

const createDestination = async (req, res) => {
  const log = await Logs.createLog(req);

  try {
    const { name, transport, url } = req.body;

    const newDestination = await Destinations.createNewDestination(name, transport, url);

    await Logs.updateLog(log._id, { status: newDestination.status, body: newDestination.description });

    res.status(newDestination.status).json({ description: newDestination.description });
  } catch (error) {
    await Logs.updateLog(log._id, { status: 500, body: { description: 'Server error' } }, error);
    res.status(500).json({ description: 'Server error' });
  }
};

module.exports = {
  createDestination,
};
