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
            .services.form.create(body);
         })
       } else {

            await strapi
            .services.form.create(ctx.request.body);

       }
        return "ok"
    },


};

