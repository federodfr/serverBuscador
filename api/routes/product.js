const   express = require('express'),
        router  = express.Router(),
        request = require('request'),
        obj = {},
        parseProduct = require('../parsers/product');

router.get('/:id', 
    (req, res, next) => {
        request.get(
        {
            url: `https://api.mercadolibre.com/items/${req.params.id}`,
            json: true
        }, 
        (error, response, body) =>  {
            Object.assign(obj, body) ;
            next()
        });
    },
    (req, res, next) => {
        request.get(
        {
          url: `https://api.mercadolibre.com/items/${req.params.id}/description`,
          json: true
        }, 
        (error, response,body) => {
          Object.assign(obj, body);
          next()  
        });
    }, 
    (req,res) => {
        let parsedData = parseProduct(obj)
          res.send(parsedData)
    })

module.exports = router;