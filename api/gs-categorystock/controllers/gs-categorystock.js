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
    var params1 = {}

    if (!ctx.state.user){
        return "-1" //请先登录
    }

    // 添加操作记录
    params1['users_permissions_user'] = ctx.state.user
    params1['code'] = params['code']
    params1['name'] = params['name']
    params1['count'] = params['count']
    params1['categoryid'] = params['categoryid']
    params1['price'] = params['buyprice']
    params1['opttype'] = '1'

    await gs_optevent.create(params1)


    // 检查同一个策略是否存在此股票
    // 用户，策略ID，count>0
    var ret = await gs_catestock.findOne({'users_permissions_user':ctx.state.user,
                                categoryid:params['categoryid'],
                                code:params['code'],
                                count:{$gt:0}})

    var p_count = parseInt(params['count'])
    var p_buyprice = parseFloat(params['buyprice'])

    if (ret){
    //加仓操作
        var r_count = parseInt(ret.count)
        var r_buyprice = parseFloat(ret.buyprice)

        var buyprice = (r_buyprice * r_count + p_buyprice  * p_count ) / (r_count + p_count)
        buyprice = buyprice.toFixed(2)
        ret = await gs_catestock.updateOne({_id:ret._id},{
                                buyprice:buyprice,
                                count : (r_count+p_count)
                        })


   } else {

        //建仓

        params['users_permissions_user'] = ctx.state.user
        params['startdate'] = moment(new Date()).format('YYYY-MM-DD')
        ret = await gs_catestock.create(params)
    }
    
    return ret
}

async function sellGScatestock(ctx){
    let gs_catestock = strapi.models['gs-categorystock']
    let gs_optevent = strapi.models['gs-optevent']
    var params = ctx.request.body
    var params1 = {}

    if (!ctx.state.user){
        return "-1" //请先登录
    }


    var ret = await gs_catestock.findOne({'users_permissions_user':ctx.state.user,_id:params['id']}) 
    if(!ret){
        return "-2" //没有对应的持仓
    }

    var p_count = parseInt(params['count'])
    var p_buyprice = parseFloat(params['buyprice'])
    var r_count = parseInt(ret.count)
    var r_buyprice = parseFloat(ret.buyprice)
    var count = r_count - parseInt(params['count'])

    if (count < 0 ){

        return "-3" //不够
    }
    var buyprice = 0
    if (count > 0){
         // 减仓
         buyprice = (r_buyprice * r_count  - p_buyprice  * p_count ) / (r_count - p_count)
         buyprice.toFixed(2)
    } else {
        // 清仓
         buyprice = r_buyprice
    }

    ret = await gs_catestock.updateOne({'users_permissions_user':ctx.state.user,_id:params['id']},{buyprice:buyprice,'count': count})
    
    params1['users_permissions_user'] = ctx.state.user
    params1['code'] = params['code']
    params1['name'] = params['name']
    params1['count'] = params['count']
    params1['categoryid'] = params['categoryid']
    params1['price'] = params['sellprice']
    params1['opttype'] = '2'

    await gs_optevent.create(params1)

    return ret
}


async function updatestockorder(ctx){

    let datas = []
    let req = ctx.request
    let data;
    let gs_catestock = strapi.models['gs-categorystock']

    req.body.forEach(item =>
    {

        data  = {updateOne: {
            filter: {
                _id: item.id,
            },
            update: { $set: {order:item.order} },
            upsert: true
        }}
        datas.push(data)
    });
    try {
        let result = await gs_catestock.bulkWrite(datas)
    } catch (e){
        let err = e
        console.log(e)
    }
    return 'update ok'

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
        return [] //请先登录
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
    async updateorder(ctx){
        return updatestockorder(ctx)
    },
};


