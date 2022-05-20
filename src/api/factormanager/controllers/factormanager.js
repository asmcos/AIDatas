'use strict';

/**
 *  factormanager controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

function insertOrUpdate(knex, tableName, data) {
    const firstData = data[0] ? data[0] : data;
    return knex.raw(knex(tableName).insert(data).toQuery() +" ON DUPLICATE KEY UPDATE " +
      Object.getOwnPropertyNames(firstData).map((field) => `${field}=VALUES(${field})`).join(","));
}
module.exports = createCoreController('api::factormanager.factormanager',({ strapi }) =>  ({

    async getfactors(ctx){
        let tablename = "";
    
        const knex = strapi.db.connection;
        let factorname = ctx.query.factorname;
        let date = new Date()
        date = date.toJSON().split("T")[0]

        //是否存在这个因子
        var result = await strapi.db.query('api::factormanager.factormanager').findOne(
          {
            factorname: factorname,
          }
        );
        if (result == null){
          return "Not found " + factorname + "?"
        }
        tablename = result.tablename;

        //获取因子最后提交的时间
        if (ctx.query.date){
          result = await strapi.controller('api::eventlog.eventlog').findlog(factorname,ctx.query.date,1);
        } else {
          //eventlog tablename  可能是某一个表，也可能是某一个因子名
          result = await strapi.controller('api::eventlog.eventlog').findlog(factorname,date,1);
        }

        //从对应表里查询结果
        if (result.length > 0){
          result = await knex(tablename).where({
            factorname:factorname,
            date:result[0].date,
          })
          return result 
        } else {
          return "[]"
        }
        

   },

    async postfactors(ctx){
        let tablename = "";
        let data = [];
        let date = new Date()
        date = date.toJSON().split("T")[0]
        
        
        const knex = strapi.db.connection;
        let factorname = ctx.query.factorname;
        

        if (factorname == null){
          return "factorname=?,Not found factorname!"
        }
        
        ctx.request.body.forEach(item=>{
          item.date = date
          item.factorname = factorname
          data.push(item)
        })
        var result = await strapi.db.query('api::factormanager.factormanager').findOne(
          {
            factorname: factorname,
          }
        );
        if (result == null){
          tablename = await this.createfactor(factorname);
        } else {
          tablename = result.tablename;
        }
        await insertOrUpdate(knex,tablename,data);
        strapi.controller('api::eventlog.eventlog').createlog(factorname);
        return "ok"
    },
    async createfactor(factorname){
      let newtable = 0;
      let tablename = "";
      let count = 1;

      var result = await strapi.db.query('api::factormanager.factormanager').findOne(
        {
          orderBy: {'id':'desc'},
        }
      );
      console.log(result);

      if (result == null){
        tablename = "factor1"
        newtable = 1
      } else {
        
        
        count = parseInt(result.count);
        if (count < 100){
          tablename = result.tablename;
          count = count + 1;
        } else {
          tablename = result.tablename.split('factor')[1]

          tablename  = parseInt(tablename) + 1;
          tablename = "factor" + tablename
          newtable = 1;
          count = 1;
        }

      }

      if (newtable == 1){
        const knex = strapi.db.connection;
        await knex.schema
              .createTable(tablename, tbl => {
              tbl.increments().primary();
              tbl.string("factorname", 255);
              tbl.string("date", 32);
              tbl.string("code", 16).notNullable();
              tbl.string("value",255);
              tbl.unique(['factorname','date','code']);
        })
      }
      
      await strapi.db.query('api::factormanager.factormanager').createMany({
        data:[{
          tablename:tablename,
          factorname:factorname,
          count:count,
        }]
      });
      return tablename
    },
    async create(ctx){
        let query = ctx.query;
        let factorname = query.factorname

        var result = await strapi.db.query('api::factormanager.factormanager').findMany({  
            where:{
                factorname:factorname,
            },
        })
        
        if (result.length <= 0){
          await this.createfactor(factorname);
        }

        return "create factor ok"
    }

}));

