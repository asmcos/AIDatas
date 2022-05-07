module.exports = {routes:[
  {
    method: 'GET',
    path: '/gs-userinfo/me',
    handler: 'gs-userinfo.findme',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/gs-userinfos',
    handler: 'gs-userinfo.create',
    config: { policies: [] }
  },
]}
