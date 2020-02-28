function parse(body){
    let name        = 'Federico',
        lastname    = 'Rodriguez',
        filters     = body && body.filters || {},
        categories  = getCategories(filters) || [] ,
        results     = body && body.results || [],
        items       = getItemsList(results) || [];

        return Object.assign({}, {
            author: {
                name,
                lastname
            },
            categories,
            items
        })

}

function getCategories(filters) {
    let categories          = filters && filters.find(filter => filter.id ==='category') || {},
        values              = categories.values || [],
        categoriesValues    = values.length && values[0] || {},
        path_from_root      = categoriesValues.path_from_root || [],
        categoriesArray     = [];

        path_from_root.forEach( value => {
            categoriesArray.push(value.name)
        })

    return categoriesArray;
}

function getItemsList(results) {
    let items = [],
        getItems = results && results.forEach(item => {items.push(getItem(item))});

    return items
}

function getItem(item) {
    let id              = item && item.id || '',
        title           = item && item.title || '',
        price           = item && getPrice(item),
        picture         = item.thumbnail || '',
        condition       = item.condition || '',
        shipping        = item.shipping || {},
        free_shipping   = shipping.free_shipping || false,
        address         = item.address || {},
        location        = address.state_name;

    return {
        id,
        title,
        price,
        picture,
        condition,
        free_shipping,
        location,
    }
}

function getPrice(item) {
    let currency        = item && item.currency_id || '',
        price           = item && item.price || 0,
        priceSplitted   =  String(price).split(',') || []
        amount          = parseInt(priceSplitted[0]) || 0,
        decimals        = parseInt(priceSplitted[1]) || 0;
    
    return {
        currency,
        amount,
        decimals,
    }
}

module.exports = parse;

