// REQUIRE MONGOOSE LIBRARY
const mongoose = require('mongoose');
// INITIALIZE A SCHEMA
const { Schema } = mongoose;
// VARIABLES FOR SCHEMA
const requiredString = { type: String, required: true };
// DEFINING OUR logEntrySchema SCHEMA
const logEntrySchema = new Schema(
  {
    title: requiredString,
    description: String,
    Comments: String,
    Rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    Image: String,
    Latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    Longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    visitDate: { type: Date, required: true },
  },
  { timestamps: true },
);
// INSTANTIATE A MODEL WITH OUR SCHEMA
const LogEntry = mongoose.model('logEntry', logEntrySchema);
// EXPORT OUR MODEL
module.exports = LogEntry;
