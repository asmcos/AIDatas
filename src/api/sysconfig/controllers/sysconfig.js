'use strict';
const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::sysconfig.sysconfig', ({ strapi }) =>  ({

    async find(ctx){
        let query = ctx.query

        let key = query.keyword
        if (query.filter){
            
            var result = await strapi.db.query('api::sysconfig.sysconfig').findMany({
                where: {
                  key: {
                      $contains: key,
                  },
                },
              });
        }else {
           var result = await strapi.db.query('api::sysconfig.sysconfig').findMany({
               where:{key:key},
            });
        }
        return result;
    },

}));
