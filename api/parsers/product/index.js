function parse(item){
    let name            = 'Federico',
        lastname        = 'Rodriguez',
        id              = item && item.id || '',
        title           = item && item.title || '',
        price           = item && getPrice(item),
        pictures        = item && item.pictures || [],
        picture         = pictures && getPicture(pictures) || '',
        condition       = item.condition,
        shipping        = item. shipping || {},
        free_shipping   = shipping.free_shipping || false,
        sold_quantity   = item.sold_quantity || 0,
        description     = item.plain_text || '';

        return Object.assign({}, {
            author: {
                name,
                lastname
            },
            item: {
                id,
                title,
                price,
                picture,
                condition,
                free_shipping,
                sold_quantity,
                description,
            }
        })
}

function getPrice(item){
    let currency    = item && item.currency_id || '',
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

function getPicture(pictures){
    let picture     = pictures.find( item => item.max_size === '680x982') || pictures[0] || {},
        pictureUrl  = picture.url || '';
        console.log(picture)
    return pictureUrl
}

module.exports = parse