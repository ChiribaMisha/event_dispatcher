const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');

generalSchema.statics.createNewDestination = function (name, transport, url = null) {
  try {
    const newDestination = new this({
      name,
      transport,
      url,
    });

    const result = newDestination
      .save()
      .then((r) => {
        return { status: 200, description: 'Destination created' };
      })
      .catch((err) => {
        switch (err.code) {
          case 11000:
            return { status: 400, description: `Dublicate ${Object.keys(err.keyValue)}` };
          default:
            return { status: 500, description: `Server Error` };
        }
      });

    return result;
  } catch (error) {
    return { status: 500, description: `Server Error` };
  }
};

const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);

module.exports = model;
