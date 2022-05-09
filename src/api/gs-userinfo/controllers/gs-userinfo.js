'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function createGSuserinfo(ctx){
    let gs_userinfo = strapi.service('api::gs-userinfo.gs-userinfo');
    var params = ctx.request.body


    if (!ctx.state.user){

        return "-1" //请先登录
    }

    var ret =  await gs_userinfo.findOne({'users_permissions_user':ctx.state.user})
    if (ret){ //update
        ret.intro = params['intro']
        ret.save()
        return ret
    
    } else { //create
        params['users_permissions_user'] = ctx.state.user
        params['remain_cash'] = params['capital_money']
        params['stock_value'] = 0
        return await gs_userinfo.create(params)
    }
}

async function findGSme(ctx){

    let gs_userinfo = strapi.models['gs-userinfo']

    if (!ctx.state.user){

        return "-1" //请先登录
    }


    var ret =  await gs_userinfo.findOne({'users_permissions_user':ctx.state.user})
    return ret
}

module.exports = {

    async findme(ctx){
        return findGSme(ctx)
    },
    async create(ctx){
        return createGSuserinfo(ctx)
    },
};
