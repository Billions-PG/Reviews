const app = require('./index.js');
require('newrelic');

app.listen(process.env.PORT || 3000);
