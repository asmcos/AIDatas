const { templateConfiguration, env } = require('@strapi/utils');
var config = require('./config/database')({env})
var k = require('knex')(config.connection)


async function execCMD() {

  try {
   await k.schema.alterTable('dayks', function(t) {
      t.unique(['code','date']);
    })

    console.log("创建成功");

    process.exit();

  } catch(e){
    if (e.code == "ER_DUP_KEYNAME") console.log('已经创建了联合键');
    else { console.log(e)}

    process.exit();

}
  
}

execCMD();