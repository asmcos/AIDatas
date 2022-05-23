'use strict';

/**
 *  grouplist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::grouplist.grouplist',({ strapi }) =>  ({

    async find(ctx){
        let query = ctx.query;
        let name = query.name;
        let start = query.start;
        let end = query.end;

        const knex = strapi.db.connection;

        var result = await knex("grouplists").where('date','>=',start)
            .andWhere('name','=',name)
            .andWhere('date','<=',end)
            .orderBy('date','desc')
            .orderBy('id','desc')

        return result            

    },
    /*
     * 创建函数严格遵守时间顺序做结算，如果时间顺序出错，结算将会出错
     */
    async create(ctx){
        let query = ctx.query;
        let name = query.name
        let code = query.code
        let vol  = parseInt(query.vol)
        let date = query.date
        let status = query.status
        let groupid;

        
        var result = await strapi.db.query('api::groupmanager.groupmanager').findMany({  
            where:{
                name:name,
            },
        })
        
        
        if (result.length <= 0){
            return "还没有创建该组，请先创建"
        }

        groupid = result[0].id

        var result = await strapi.db.query('api::grouplist.grouplist').findOne({  
            where:{
                name:name,
                code:code,
            },
            orderBy: {'date':'DESC',"id":"DESC"},
        })

        if (result){ //有历史记录
            let totalvol;
            if (status == -1){
                if (parseInt(result.totalvol) < vol){
                    return "没有足够的量来减仓: 现有仓位 " + result.totalval 
                }
                totalvol = parseInt(result.totalvol) - vol    
            } else if (status == 1) {
                totalvol = parseInt(result.totalvol) + vol
            } else {
                return "操作码不对，status 只能是1，-1";
            }


            let data = {
                name:name,
                vol:vol,
                code:code,
                totalvol:totalvol,
                date:date,
                status:status,
                groupmanager:groupid,
              };
            

            let ret = await strapi.entityService.create('api::grouplist.grouplist', {data:data,
                 populate: { groupmanager: true, createdBy: true, updatedBy: true },}); 


            return "create ok"
        } else { //无记录
            if (status == -1)  {
              return "没有历史数据，无法减少"
            }
            let data = {
                name:name,
                vol:vol,
                code:code,
                totalvol:vol,
                date:date,
                status:status,
                groupmanager:groupid,
              };

            let ret = await strapi.entityService.create('api::grouplist.grouplist', {data:data,
                populate: { groupmanager: true, createdBy: true, updatedBy: true },});
   
            return "create ok"
        }
    },
    //所有记录有效，重新结算
    async reevaluate(ctx){
        

    };
}));
