'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sysconfig.sysconfig', ({ strapi }) =>  ({

    async find(ctx){
        let query = ctx.query

        let key = query.keyword
        if (query.filter){
    
           var filter = [{key: {$regex: key}}]
           var result = await super.find({$or:filter})
    
        }else {
           var result = await super.find({key:key})
        }
        return result;
    },

}));
