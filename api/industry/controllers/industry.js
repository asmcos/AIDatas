'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

/*
 * drop 已经停牌的股票，所以全部删除从新来
 */
async function dropIndustry(ctx){
    let industry = strapi.models.industry

    await industry.drop()
    return 'Hello World!'
}


async function insertManyIndustry(ctx){
    let datas = []
    let req = ctx.request
    let industry = strapi.models.industry
    let data;

    req.body.forEach(item =>
    {

        data  = {updateOne: {
          filter: {
            code: item.code,
            },
            update: { $set: item },
            upsert: true
        }}
        datas.push(data)
    });
    try {
        let result = await industry.bulkWrite(datas)
    } catch (e){
        let err = e
        console.log(e)
    }
    return 'Hello World!'
}

async function findIndustry(ctx){
    let industry = strapi.models.industry

    return await industry.find()
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
