const   express = require('express'),
        router  = express.Router();
        request = require('request'),
        parseList = require('../parsers/List');

router.get('/',(req, res) => {
    request.get({
        url: `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q || ''}`,
        json: true
    }, (error, response, body) => {
        let parsedData = parseList(body);
        res.send(parsedData) 
    })
})

module.exports = router;