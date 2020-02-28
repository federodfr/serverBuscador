const   express     = require('express'),
        app         = express(),
        mongoose    = require('mongoose'),
        list        = require('./routes/list'),
        product     = require('./routes/product');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true});

app.use('/api/items', list)
app.use('/api/items', product)

module.exports = app;