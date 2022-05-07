module.exports = {routes:[
  {
    method: 'GET',
    path: '/industries',
    handler: 'industry.find',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/industries/drop',
    handler: 'industry.drop',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/industries/updates',
    handler: 'industry.updates',
    config: { policies: [] }
  },
]}
