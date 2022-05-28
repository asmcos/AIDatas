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
        let freq = 0;
    
        const knex = strapi.db.connection;
        let factorname = ctx.query.factorname;
        let date = new Date()
        date = date.toJSON().split("T")[0]

        //是否存在这个因子
        var result = await strapi.db.query('api::factormanager.factormanager').findOne({        
          where:{
            factorname: factorname,}
          });
        if (result == null){
          return "Not found " + factorname + "?"
        }
        tablename = result.tablename;
        freq = result.freq;

        //从对应表里查询结果
        if (result){
          if (freq == 0){
            //获取因子最后提交的时间
            if (ctx.query.date){
              result = await strapi.controller('api::eventlog.eventlog').findlog(factorname,ctx.query.date,1);
            } else {
              //eventlog tablename  可能是某一个表，也可能是某一个因子名
              result = await strapi.controller('api::eventlog.eventlog').findlog(factorname,date,1);
            }
            result = await knex(tablename).where({
              factorname:factorname,
              date:result[0].date,
            })
          } else if(freq == 1){
              result = await knex(tablename).where('date', '<=',date) //日更数据获取今日最近的数据 
              .select(['code','date',factorname])
          }
          return result 
        } else {
          return "[]"
        }
        

   },
   //提交因子数据
    async postfactors(ctx){
        let tablename = "";
        let freq = 0;
        let data = [];
        let date = new Date()
        date = date.toJSON().split("T")[0]
        
        
        const knex = strapi.db.connection;
        let factorname = ctx.query.factorname;
         if (ctx.query.date){
           date = ctx.query.date
         }

        if (factorname == null){
          return "factorname=?,Not found factorname!"
        }
        

        var result = await strapi.db.query('api::factormanager.factormanager').findOne(
          {
            where:{
              factorname: factorname,}
          }
        );
 
        if (result == null){
          return "因子没有创建，请先创建因子"
        } else {
          tablename = result.tablename;
          freq = result.freq;
        }
        if (freq == 0){

          ctx.request.body.forEach(item=>{
            
            item.date = date
            item.factorname = factorname
            data.push(item)
          })

          await insertOrUpdate(knex,tablename,data);
          //日志记录 主要是获取更新日期
          strapi.controller('api::eventlog.eventlog').createlog(factorname,date);
        } else if (freq==1){
          //日更数据，不用汇报更新表,
          //日更数据日期必须由计算者提供日期
          ctx.request.body.forEach(item=>{           
            data.push(item)
          })
          await insertOrUpdate(knex,tablename,data);
        }
        
        
        return "ok"
    },
    //建立一个不定时更新因子，数据更新不会太频繁。例如周，半月
    async createfactor0(factorname,describe){
      let newtable = 0;
      let tablename = "";
      let count = 1;

      var result = await strapi.db.query('api::factormanager.factormanager').findOne(
        {
          orderBy: {'id':'desc'},
          where:{'freq':0}, //不定时更新
        }
      );
      console.log(result);

      if (result == null){
        tablename = "factora1" //表a，1表示第一个表，后面累加
        newtable = 1
      } else {
        
        
        count = parseInt(result.count);
        if (count < 5){
          tablename = result.tablename;
          count = count + 1;
        } else {
          tablename = result.tablename.split('factora')[1]

          tablename  = parseInt(tablename) + 1;
          tablename = "factora" + tablename
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
          describe,describe,
          count:count,
          freq:0,
        }]
      });
      return tablename
    },

    //建立一个日更因子
    async createfactor1(factorname,describe){
      let newtable = 0;
      let tablename = "";
      let count = 1;

      var result = await strapi.db.query('api::factormanager.factormanager').findOne(
        {
          orderBy: {'id':'desc'},
          where:{'freq':1},
        }
      );
      console.log(result);

      if (result == null){
        tablename = "factorb1"
        newtable = 1
      } else {
        
        
        count = parseInt(result.count);
        if (count < 5){
          tablename = result.tablename;
          count = count + 1;
        } else {
          tablename = result.tablename.split('factorb')[1]

          tablename  = parseInt(tablename) + 1;
          tablename = "factorb" + tablename
          newtable = 1;
          count = 1;
        }

      }

      const knex = strapi.db.connection;
      if (newtable == 1){
        
        await knex.schema
              .createTable(tablename, tbl => {
              tbl.increments().primary();
              tbl.string(factorname, 255);
              tbl.string("date", 32);
              tbl.string("code", 16).notNullable();
              tbl.unique(['date','code']); //日更表
        })
      } else {
        // 增加一个字段，字段名是因子名称
        await knex.schema.alterTable(tablename, function (tbl) {
          tbl.string(factorname);
        })
      }
      
      await strapi.db.query('api::factormanager.factormanager').createMany({
        data:[{
          tablename:tablename,
          factorname:factorname,
          describe:describe,
          count:count,
          freq:1,
        }]
      });
      return tablename
    },
    async create(ctx){
        let query = ctx.query;
        let factorname = query.factorname
        let describe = query.describe
        
        
        if (query.freq == null){
          return "请设置更新频率，日更新设置1，其他不定期更新设置0"
        }

        var result = await strapi.db.query('api::factormanager.factormanager').findMany({  
            where:{
                factorname:factorname,
            },
        })
        
        if (result.length <= 0){
          if (query.freq == 0){
            await this.createfactor0(factorname,describe);
          } else if (query.freq == 1){
            await this.createfactor1(factorname,describe);
          } else {
            return "错误的updatefreq"
          }
          return "create factor ok"
        } else {
          return "factorname " + factorname + "已经存在"
        }

    }

}));

