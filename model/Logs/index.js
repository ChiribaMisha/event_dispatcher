const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');

generalSchema.statics.createLog = async function (request, response) {
  const newLog = new this({
    request: {
      headers: JSON.stringify(request.headers),
      body: JSON.stringify(request.body),
    },
    response: {
      status: response ? response.status : null,
      body: response ? JSON.stringify(response.body) : null,
    },
  });

  const log = await newLog.save().catch((err) => console.error(err));

  return log;
};

generalSchema.statics.updateLog = async function (id, response, error) {
  await this.findOneAndUpdate(id, {
    response: {
      status: response.status,
      body: JSON.stringify(response.body),
    },
    error: error ? error.stack.toString() : null,
  }).catch((err) => console.error(err));
};

const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);

module.exports = model;
