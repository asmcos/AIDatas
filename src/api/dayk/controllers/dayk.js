'use strict';

// 使用on duplicate key update 语法
// 解决 insert or update 问题

function insertOrUpdate(knex, tableName, data) {
    const firstData = data[0] ? data[0] : data;
    return knex.raw(knex(tableName).insert(data).toQuery() +" ON DUPLICATE KEY UPDATE " +
      Object.getOwnPropertyNames(firstData).map((field) => `${field}=VALUES(${field})`).join(","));
  }

async function insertManyDayk(ctx){

    let req = ctx.request

    const knex = strapi.db.connection;
    
    await insertOrUpdate(knex,'dayks',req.body);
    
    return 'Hello World!'
}

async function findDayk(ctx){

    var start = "0"
    var offset = 1000
    var limit = 20
    var code = "sh.600000"
    var end = "0"

    let query = ctx.query

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
        var result = await strapi.db.query('api::dayk.dayk').findMany({
            
            where:{
                code:code,
                date:{"$lte":end}
            },
            orderBy:{date:'DESC'},
            limit:limit,
           })
    }else if (start != "0"){

        var result = await strapi.db.query('api::dayk.dayk').findMany({
            
            where:{
                code:code,
                date:{"$gte":start}
            },
            orderBy:{date:'DESC'},
            limit:limit,
        })
    } 

    return result;
}

module.exports = {

    async updates(ctx) {
        return insertManyDayk(ctx)
    },
    async find(ctx){
        return findDayk(ctx)
    },

};
