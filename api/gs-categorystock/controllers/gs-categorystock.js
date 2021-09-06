'use strict';



const { sanitizeEntity } = require("strapi-utils");

const moment = require('moment')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function createGScatestock(ctx){
    let gs_catestock = strapi.models['gs-categorystock']
    var params = ctx.request.body


    if (!ctx.state.user){
        return "-1" //请先登录
    }

    params['users_permissions_user'] = ctx.state.user
    params['buydate'] = moment(new Date()).format('YYYY-MM-DD')
    return await gs_catestock.create(params)

}



async function findGSstrategy(ctx){


    let gs_strategy = strapi.models['gs-strategy']
    /*if (!ctx.state.user){
        return "-1" //请先登录
    }*/
    var ret =  await gs_strategy.findOne({_id:ctx.params.id})
    return ret
}

async function findGSme(ctx){


    let gs_strategy = strapi.models['gs-strategy']
    if (!ctx.state.user){
        return "-1" //请先登录
    }
    var ret =  await gs_strategy.find({users_permissions_user:ctx.state.user})
    return ret
}


module.exports = {

    async findme(ctx){
        return findGSme(ctx)
    },

    async findOne(ctx){
        return findGScatestock(ctx)
    },
    async create(ctx){
        return createGScatestock(ctx)
    },
};


