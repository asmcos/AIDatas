const { templateConfiguration, env } = require('@strapi/utils');
var config = require('./config/database')({env})
var k = require('knex')(config.connection)



async function unique(table,cols){

  try {
   await k.schema.alterTable(table, function(t) {
      t.unique(cols);
    })

    console.log("创建"+table+"成功");


  } catch(e){
    if (e.code == "ER_DUP_KEYNAME") console.log('已经创建了'+table+'联合键');
    else { console.log(e)}


  }


}

async function execCMD() {

  await unique('dayks',['code','date'])
  await unique('months',['code','date'])
  await unique('weeks',['code','date'])
  await unique('eventlogs',['tablename','date'])
  await unique('stocklists',['code','date'])

 
  process.exit();
}

execCMD();
