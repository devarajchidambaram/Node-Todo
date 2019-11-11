const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const routes = require('./server/routes')

const env = process.env.NODE_ENV || 'development'

const app = express();

app.use(helmet())

// compress responses
app.use(compression())

if(env === 'development') app.use(logger('dev'));

app.use(cors({
  origin: ['http://192.168.34.6:8000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;