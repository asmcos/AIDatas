'use strict';

/**
 *  stocklist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

function insertOrUpdate(knex, tableName, data) {
    const firstData = data[0] ? data[0] : data;
    return knex.raw(knex(tableName).insert(data).toQuery() +" ON DUPLICATE KEY UPDATE " +
      Object.getOwnPropertyNames(firstData).map((field) => `${field}=VALUES(${field})`).join(","));
}


module.exports = createCoreController('api::stocklist.stocklist',({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
  
    async create(ctx){
        let query = ctx.query;
        let req = ctx.request

        let listall = [];
        let tablename = "stocklist"

        strapi.controller('api::eventlog.eventlog').createlog(tablename);
        let date = new Date()
        date = date.toJSON().split("T")[0]
        req.body.forEach(item =>{
            item.date = date;
            listall.push(item)
        })

        const knex = strapi.db.connection;
    
        await insertOrUpdate(knex,'stocklists', 
          listall);

      return "stocklist ok";
    },
  }));
  
