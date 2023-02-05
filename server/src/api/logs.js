// REQUIRE EXPRESS LIBRARY
const { Router } = require('express');
// REQUIRE OUR LogEntry MODEL
const LogEntry = require('../models/LogEntry.js');
// INSTANCIATE AN EXPRESS ROUTE
const router = Router();
// A GET REQUEST TO OUR ROOT OF OUR ROUTE
router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

// A GET REQUEST TO FIND LOG BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const entry = await LogEntry.findById(req.params.id);
    res.json(entry);
  } catch (err) {
    next(err);
  }
});

// A POST REQUEST TO ADD A NEW ENTRY TO THE DATABASE
router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
  // console.log(logEntry);
  // res.json({ message: 'A New Log Added Successfully' });
});
// EXPORT OUR ROUTER
module.exports = router;
