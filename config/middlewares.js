module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: false
    }
  },
  {name:'strapi::cors',
   config:{
    credentials:true,
    origin:"*",
   }
  },

  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
  name:'strapi::body',
  config:{
    jsonLimit:"10mb",
    formLimit:"10mb"
  }

  },
  'strapi::favicon',
  'strapi::public',
  'global::index-middleware',

];
