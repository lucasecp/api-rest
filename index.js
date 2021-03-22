const App = require('./app');
require('dotenv').config();

const port = process.env.SERVER_PORT || 7000;

App.listen(port);
