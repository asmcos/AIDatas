'use strict';


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::strategy.strategy',({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action

  async find(ctx){

        var result = await strapi.db.query('api::strategy.strategy').findMany({           
          });
  
    return result;
},
}));
