module.exports = {routes:[
  {
    method: 'POST',
    path: '/gs-categorystocks/sell',
    handler: 'gs-categorystock.sell',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/gs-categorystocks/updateorder',
    handler: 'gs-categorystock.updateorder',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/gs-categorystocks/updatedetail',
    handler: 'gs-categorystock.updatedetail',
    config: { policies: [] }
  },
]}
