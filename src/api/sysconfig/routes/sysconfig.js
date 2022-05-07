module.exports ={routes: [
  {
    method: 'GET',
    path: '/sysconfigs',
    handler: 'sysconfig.find',
    config: { policies: [] }
  },
]}
