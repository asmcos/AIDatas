
var path = require('path');
var staticdir = require('koa-static');
var mount = require('koa-mount');
var Router = require('koa-router');
var swig = require('koa-swig');
var co = require('co');

var router = new Router();

module.exports = strapi => {
  return {
    // can also be async
    initialize() {

        strapi.app.context.render = co.wrap(
            swig({
                root:path.resolve('./public/theme/gushen'),
                cache:false,
                ext:'html'
            })
        )

        router.get('/gushen/index.html',async(ctx,next)=>{
            return ctx.body = await ctx.render("index_3.html")
        })

        strapi.app.use(router.routes())

        strapi.app.use(staticdir(path.resolve('./public/theme/Techie')))
        strapi.app.use(mount('/gushen',staticdir(path.resolve('./public/theme/gushen'))))



    }, // initialize
  }; // return
};

