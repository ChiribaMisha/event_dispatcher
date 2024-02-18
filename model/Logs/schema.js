const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema(
  {
    request: {
      headers: {
        type: String,
        default: null,
      },
      body: {
        type: String,
        default: null,
      },
    },
    response: {
      status: {
        type: String,
        default: null,
      },
      body: {
        type: String,
        default: null,
      },
    },
    error: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);
