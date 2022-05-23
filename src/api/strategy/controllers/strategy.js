'use strict';


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::strategy.strategy',({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action

  async find(ctx){

    let query  = ctx.query;
    let req    = ctx.request
    let status = 2;
    let filter = {};

    if (query.status){
      status = query.status;
    }
    filter = {"status":status}

    if (query.lang){
      filter.lang = query.lang
    }
    if (query.title){
      filter.title = query.title
    }

    var result = await strapi.db.query('api::strategy.strategy').findMany({
        where:filter,           
          });
  
      return result;
  },

  async create(ctx){
    let query  = ctx.query;
    let req    = ctx.request

    
    let title = req.body.title
    
    var result = await strapi.db.query('api::strategy.strategy').findMany({
          where:{title:title},           
        });

    
    if (result.length > 0){
      return "创建失败，同名策略已经存在"
    }
    
    result = await strapi.db.query('api::strategy.strategy').createMany({data:[req.body]});
    
    return "创建完成"
  },

}));
