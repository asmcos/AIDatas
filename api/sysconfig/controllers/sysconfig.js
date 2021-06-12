'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

async function findsysconfig(ctx){

    let query = ctx.query
    let syscon = strapi.models.sysconfig

    let key = query.keyword

    if (query.filter){

       var filter = [{key: {$regex: key}}]
       var result = await syscon.find({$or:filter})

    }else {
       var result = await syscon.find({key:key})
    }
    return sanitizeEntity(result, { model: syscon });
}

module.exports = {

    async find(ctx){
        return findsysconfig(ctx)
    },

};


