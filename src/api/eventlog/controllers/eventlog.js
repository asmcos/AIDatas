'use strict';

/**
 *  eventlog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

function insertOrUpdate(knex, tableName, data) {
    const firstData = data[0] ? data[0] : data;
    return knex.raw(knex(tableName).insert(data).toQuery() +" ON DUPLICATE KEY UPDATE " +
      Object.getOwnPropertyNames(firstData).map((field) => `${field}=VALUES(${field})`).join(","));
}

module.exports = createCoreController('api::eventlog.eventlog',({ strapi }) =>  ({
    //eventlog tablename  可能是某一个表，也可能是某一个因子名
    async findlog(tablename,date,limit){
        var result = await strapi.db.query('api::eventlog.eventlog').findMany({  
            where:{
                tablename:tablename,
                date:{$lte:date}, //<=
            },
            orderBy:{date:'DESC'},
            limit:limit,
            
        })
        return result;
    },
    async find(ctx){
        let query = ctx.query

        let tablename = query.tablename
        let date = new Date()
        date = date.toJSON().split("T")[0]
            
        var result = await this.findlog(tablename,date,1);

        return result;
    },
    async createlog(tablename){
        let date = new Date()
        date = date.toJSON().split("T")[0]

        const knex = strapi.db.connection;
    
        await insertOrUpdate(knex,'eventlogs', 
          [
            {
              tablename: tablename,
              date:date,
            },
          ]);

    },
    
    async create(ctx){
        let query = ctx.query;
        let tablename = query.tablename

        await createlog(tablename);
  
        return "create ok"
    }
}));

