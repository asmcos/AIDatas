
var path = require('path')

module.exports = strapi => {
  return {
    // can also be async
    initialize() {
        strapi.app.use(require('koa-static')(path.resolve('./public/theme/Techie')))
    }, // initialize
  }; // return
};

