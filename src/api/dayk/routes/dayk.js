module.exports = {
 routes:[
  {
    method: 'GET',
    path: '/dayks',
    handler: 'dayk.find',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/dayks/updates',
    handler: 'dayk.updates',
    config: { policies: [] }
  },
]}
