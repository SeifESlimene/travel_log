// REQUIRE EXPRESS LIBRARY
const express = require('express');
// REQUIRE MORGAN LIBRARY
const morgan = require('morgan');
// INSTANCIATE AN HELMET APP
const helmet = require('helmet');
// INSTANCIATE AN CORS APP
const cors = require('cors');
// REQUIRE MONGOOSE LIBRARY
const mongoose = require('mongoose');
// REQUIRE OUR logs ROUTE
const logs = require('./api/logs.js');
// REQUIRE OUR NOT FOUND AND ERROR HANDLER MIDDLEWARES
const middlewares = require('./middlewares.js');
// REQUIRE DOTENV LIBRARY
require('dotenv').config();
// CONNECTING TO MONGODB ATLAS
mongoose.connect(process.env.CONNECTIONSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// INSTANCIATE AN EXPRESS APP
const app = express();
// USING BODYPARSER MIDDLEWARE
app.use(express.json());
// USING MORGAN MIDDLEWARE
app.use(morgan('common'));
// USING HELMET MIDDLEWARE
app.use(helmet());
// USING CORS MIDDLEWARE
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
// Return JSON Object When / Path Is Hit
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// USE OUR logs Middleware
app.use('/api/logs', logs);
// Use Middleware For Not Found Paths
app.use(middlewares.notFound);
// Custom Error Handling Middleware
app.use(middlewares.errorHandler);
// CONFIGURING PORT
const port = process.env.PORT || 1337;
// MAKE SERVER LISTENING ON THE PORT WE'D PREVIOUSLY CONFIGURED
app.listen(port);
