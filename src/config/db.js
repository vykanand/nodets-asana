require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.log('connected to :' + process.env.MONGODB_URL);
var connection = mongoose.connect(process.env.MONGODB_URL);

module.exports = connection;