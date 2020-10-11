require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require('./config/passport')

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://plain-fancy-develop.netlify.app']
  })
);

app.use(passport.initialize())
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

const index = require('./routes/index');
const auth = require('./routes/auth')
const event = require('./routes/event')
const announcement = require('./routes/announcement')
const team = require('./routes/team')
const user = require('./routes/user')
const venue = require('./routes/venue')

app.use('/', index);
app.use('/auth', auth);
app.use('/events', event);
app.use('/announcements', announcement)
app.use('/teams', team)
app.use('/users', user)
app.use('/venues', venue)
require('./routes/forgotPassword')(app);
require('./routes/resetPassword')(app);
require('./routes/updatePasswordViaEmail')(app);

// Uncomment this line for production
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app;
