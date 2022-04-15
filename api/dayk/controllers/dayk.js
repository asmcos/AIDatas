'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

async function insertManyDayk(ctx){
    let datas = []
    let req = ctx.request
    let dayK = strapi.models.dayk
    let data;
    
    req.body.forEach(item =>
    {
        //必须采取唯一值来做更新，否则数据会出现多条数据 
        item.codedate = item.code + item.date
        data  = {updateOne: {
            filter: {
		codedate: item.codedate,
            },
            update: { $set: item },
            upsert: true
        }}
        datas.push(data)
    });
    try {
        let result = await dayK.bulkWrite(datas)
    } catch (e){
        let err = e
        console.log(e)
    }
    return 'Hello World!'
}

async function findDayk(ctx){

    var start = "0"
    var offset = 1000
    var limit = 20
    var code = "sh.600000"
    var end = "0"

    let query = ctx.query
    let dayK = strapi.models.dayk

    if (query.end){

        end = query.end
    } else if (query.start){

        start = query.start

    } else if (query.offset){

        offset = parseInt(query.offset)

    } else{
        return "params error"
    }

    if (query.limit){
        limit = parseInt(query.limit)
    }

    if (query.code){
        code = query.code
    }
    if (end !="0"){
        var result = await dayK.find({code:code,date:{"$lte":end}}).sort("-date").limit(limit)
    }else if (start != "0"){
        var result = await dayK.find({code:code,date:{"$gte":start}}).sort("-date").limit(limit)
    } else {
        var result = await dayK.find({code:code}).skip(offset).srot("-date").limit(limit)
    }
    return sanitizeEntity(result, { model: dayK });
}

module.exports = {

    async updates(ctx) {
        return insertManyDayk(ctx)
    },
    async find(ctx){
        return findDayk(ctx)
    },

};
