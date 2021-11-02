
var path = require('path');
var staticdir = require('koa-static');
var mount = require('koa-mount');
var Router = require('koa-router');
var swig = require('koa-swig');
var co = require('co');

var router = new Router();


function set_template(filename){

        router.get('/gushen/'+filename,async(ctx,next)=>{
            return ctx.body = await ctx.render(filename)
        })


}

module.exports = strapi => {
  return {
    // can also be async
    initialize() {


        strapi.app.use(async (ctx, next) => {
                await next();
                host = {'origin':""}
                if (ctx.req.headers.referer ){
                    host = new URL(ctx.req.headers.referer)
                }
                ctx.set("Access-Control-Allow-Origin", host.origin);
        });


        strapi.app.context.render = co.wrap(
            swig({
                root:path.resolve('./public/theme/gushen'),
                cache:false,
                varControls: ['<%=', '%>'],
                ext:'html'
            })
        )

        router.get('/gushen/',async(ctx,next)=>{
            return ctx.body = await ctx.render('index.html')
        })


        set_template("login.html")
        set_template("register.html")
        set_template("index.html")
        set_template("gs_userinfo.html")
        set_template("gs_addstrategy.html")
        set_template("gs_categorystocks.html")
        set_template("gs_addzxstrategy.html")

        strapi.app.use(router.routes())

        strapi.app.use(staticdir(path.resolve('./public/theme/Techie')))
        strapi.app.use(mount('/gushen',staticdir(path.resolve('./public/theme/gushen'))))


    }, // initialize
  }; // return
};

