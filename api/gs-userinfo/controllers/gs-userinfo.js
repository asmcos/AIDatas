'use strict';

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function createGSuserinfo(ctx){
    let gs_userinfo = strapi.models.gs_userinfo

    console.log(ctx.state.user)

    return await gs_userinfo.find()
}


module.exports = {


    async create(ctx){
        return createGSuserinfo(ctx)
    },
};
