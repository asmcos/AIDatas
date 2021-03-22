'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let result;
       if (ctx.query.array == 1 ){
         ctx.request.body.map(async function(body){
            result  = await strapi
            .query("form")
            .model.forge(body)
            .save(null, { method: "insert" });
         })
       } else {

            await strapi
            .query("form")
            .model.forge(ctx.request.body)
            .save(null, { method: "insert" });

       }
        return "ok"
    },


};

