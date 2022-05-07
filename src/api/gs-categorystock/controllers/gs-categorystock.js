'use strict';




const moment = require('moment')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function createGScatestock(ctx){
    let gs_catestock = strapi.models['gs-categorystock']
    let gs_optevent = strapi.models['gs-optevent']
    let gs_strategy = strapi.models['gs-strategy']
    var params = ctx.request.body
    var params1 = {}




    if (!ctx.state.user){
        return "-1" //请先登录
    }

    var gsstrategy = await gs_strategy.findOne({_id:params['categoryid']})
    if (!gsstrategy){

        return "-2" //没有发现策略
    }
    var p_count = parseInt(params['count'])
    var p_buyprice = parseFloat(params['buyprice'])

    if (gsstrategy.remain_cash < p_count * p_buyprice ){
        return "-3" //本钱不够
    }

    //更新剩下的现金
    await gs_strategy.updateOne({_id:params['categoryid']},{
                    remain_cash:gsstrategy.remain_cash - p_count * p_buyprice})
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
    let gs_strategy = strapi.models['gs-strategy']
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
    var p_sellprice = parseFloat(params['sellprice'])
    var r_count = parseInt(ret.count)
    var r_buyprice = parseFloat(ret.buyprice)
    var count = r_count - parseInt(params['count'])

    if (count < 0 ){
        return "-3" //不够
    }
    var buyprice = 0

    if (count > 0){
         // 减仓,成本发生变化
         buyprice = (r_buyprice * r_count  - p_sellprice  * p_count ) / (r_count - p_count)
         buyprice.toFixed(2)
    } else {
        // 清仓
         buyprice = r_buyprice
    }

    //buyprice 为新的平均成本,更新成本和持股数

    ret = await gs_catestock.updateOne({'users_permissions_user':ctx.state.user,_id:params['id']},{buyprice:buyprice,'count': count})
    
    params1['users_permissions_user'] = ctx.state.user
    params1['code'] = params['code']
    params1['name'] = params['name']
    params1['count'] = params['count']
    params1['categoryid'] = params['categoryid']
    params1['price'] = params['sellprice']
    params1['opttype'] = '2'

    await gs_optevent.create(params1)

    //更新现金
    await gs_strategy.updateOne({_id:params['categoryid']},{
                    $inc:{remain_cash:p_count * p_sellprice}})
    return ret
}


async function updatestockdetail(ctx){

    let req = ctx.request
    let gs_catestock = strapi.models['gs-categorystock']
    var item = ctx.request.body

    if (!ctx.state.user){
        return "-1" //请先登录
    }


      
    try {
        let result = await gs_catestock.updateOne({
                _id: item.id,
                'users_permissions_user':ctx.state.user,
            },
            {detail:item.detail})
    } catch (e){
        let err = e
        console.log(e)
    }
    return 'update ok'

}


async function updatestockorder(ctx){
    let datas = []
    let req = ctx.request
    let data;
    let gs_catestock = strapi.models['gs-categorystock']


    if (!ctx.state.user){
        return "-1" //请先登录
    }

    req.body.forEach(item =>
    {

        data  = {updateOne: {
            filter: {
                _id: item.id,
                'users_permissions_user':ctx.state.user,
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
    async updatedetail(ctx){
        return updatestockdetail(ctx)
    },
};


