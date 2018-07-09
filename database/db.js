const mongoose = require('mongoose');
const db_url = require('../configs/database').db_url;

mongoose.connect(db_url,{ useNewUrlParser: true });
