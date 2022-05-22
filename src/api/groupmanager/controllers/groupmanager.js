'use strict';

/**
 *  groupmanager controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::groupmanager.groupmanager',({ strapi }) =>  ({

    async create(ctx){
        let query = ctx.query;
        let name = query.name
        let description = query.description
        
        var result = await strapi.db.query('api::groupmanager.groupmanager').findMany({  
            where:{
                name:name,
            },
        })
        
        if (result.length <= 0){
          await strapi.db.query('api::groupmanager.groupmanager').createMany({
              data:[{
                  name:name,
                  description:description,
              }],
          })
          return "create group ok"
        } else {
          return "name " + name + "已经存在,你可以直接使用或者换名称创建"
        }

    }
}));
