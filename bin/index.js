require('../database/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('../configs/server');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)

const app = express();

const linksRoute = require('../routes/dashboard');
const usersRoute =  require('../routes/users');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use('/links', linksRoute);
app.use('/users',usersRoute);

app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`));