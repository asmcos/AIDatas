'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


/*
 * drop 已经停牌的股票，所以全部删除从新来
 */
async function dropIndustry(ctx){

    await strapi.db.query('api::industry.industry').deleteMany({ 
        where: {
            updateDate:{$gt:'2000-05-01'}
        }
    })
    return 'Hello World!'
}


async function insertManyIndustry(ctx){

    let req = ctx.request
    await strapi.db.query('api::industry.industry').createMany({data:req.body});

    return 'Hello World!'
}

async function findIndustry(ctx){
    let industry = strapi.db.query('api::industry.industry');

    return await industry.findMany()
}




module.exports = {

   async updates(ctx){
        return insertManyIndustry(ctx)
    }, 
   async drop(ctx) {
        return dropIndustry(ctx)
    },
   async find(ctx){
        return findIndustry(ctx)
    },
};
