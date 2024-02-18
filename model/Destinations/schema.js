const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema(
  {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    transport: {
      type: 'string',
      required: true,
    },
    url: String,
  },
  { timestamps: true },
);
