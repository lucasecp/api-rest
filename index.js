const App = require('./app');
require('dotenv').config();

const port = process.env.PORT || 7000;

App.listen(port);
