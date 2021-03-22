'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity,responsedata,resp;

    if (ctx.query.alldata == 1){
        console.log(ctx.request.body)
        entity = await strapi.services.request.create(ctx.request.body.request);
        responsedata = ctx.request.body.response
        responsedata.RequestID = entity.id

        resp = await strapi.services.response.create(responsedata);

        if (ctx.request.body.header != null ) {
            ctx.request.body.header.map(async function(head){
                if (head.type == 1) {
                    head.parentid = entity.id + ""
                } else {
                    head.parentid = resp.id + ""
                }
                await strapi.services.header.create(head)
            })

        } //if

        if (ctx.request.body.form != null ) {
            ctx.request.body.form.map(async function(f){
                if (f.type == 1) {
                    f.parentid = entity.id + ""
                } else {
                    f.parentid = resp.id + ""
                }
                await strapi.services.form.create(f)
            })
        }



    } else {

        // entity = await strapi.services.post.create(ctx.request.body);
        entity = await strapi.services.request.create(ctx.request.body);
    }
   return sanitizeEntity(entity, { model: strapi.models.request });
  },
};


