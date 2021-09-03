'use strict';


const { sanitizeEntity } = require("strapi-utils");

const moment = require('moment')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function createGSstrategy(ctx){
    let gs_strategy = strapi.models['gs-strategy']
    var params = ctx.request.body


    if (!ctx.state.user){
        return "-1" //请先登录
    }

    params['remain_cash'] = params['capital_money']
    params['stock_value'] = 0
    params['users_permissions_user'] = ctx.state.user
    params['createdate'] = moment(new Date()).format('YYYY-MM-DD')
    return await gs_strategy.create(params)
    
}

async function findGSstrategy(ctx){


    let gs_strategy = strapi.models['gs-strategy']
    if (!ctx.state.user){
        return "-1" //请先登录
    }
    var ret =  await gs_strategy.findOne({_id:ctx.params.id})
    return ret
}

module.exports = {

    async findOne(ctx){
        return findGSstrategy(ctx)
    },
    async create(ctx){
        return createGSstrategy(ctx)
    },
};


