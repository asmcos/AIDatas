'use strict';



const { sanitizeEntity } = require("strapi-utils");

const moment = require('moment')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function createGScatestock(ctx){
    let gs_catestock = strapi.models['gs-categorystock']
    let gs_optevent = strapi.models['gs-optevent']
    var params = ctx.request.body
    var params1

    if (!ctx.state.user){
        return "-1" //请先登录
    }

    params['users_permissions_user'] = ctx.state.user
    params['startdate'] = moment(new Date()).format('YYYY-MM-DD')
    var ret = await gs_catestock.create(params)

    
    params1['users_permissions_user'] = ctx.state.user
    params1['code'] = params['code']
    params1['name'] = params['name']
    params1['count'] = params['count']
    params1['categoryid'] = params['categoryid']
    params1['price'] = params['buyprice']
    params1['opttype'] = '1'

    await gs_optevent.create(param1)

    return ret
}

async function sellGScatestock(ctx){
    let gs_catestock = strapi.models['gs-categorystock']
    let gs_optevent = strapi.models['gs-optevent']
    var params = ctx.request.body
    var params1

    if (!ctx.state.user){
        return "-1" //请先登录
    }


    var ret = gs_catestock.findOne({'users_permissions_user':ctx.state.user,id:params['id']}) 
    if(ret){
        return "-2" //没有对应的持仓
    }

    if (ret.count - params['count'] < 0 ){

        return "-3" //不够
    }

    await gs_catestock.updateOne({'users_permissions_user':ctx.state.user,id:params['id']},{'count': ret.count-params['count']})

    
    params1['users_permissions_user'] = ctx.state.user
    params1['code'] = params['code']
    params1['name'] = params['name']
    params1['count'] = params['count']
    params1['categoryid'] = params['categoryid']
    params1['price'] = params['sellprice']
    params1['opttype'] = '2'

    await gs_optevent.create(param1)

    return ret
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

    async sell(ctx){
        return sellGScatestock(ctx)
    },
};


