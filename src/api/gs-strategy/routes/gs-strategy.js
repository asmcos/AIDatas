module.exports = {routes:[
  {
    method: 'GET',
    path: '/gs-strategies/me',
    handler: 'gs-strategy.findme',
    config: { policies: [] }
  },
  {
    method: 'GET',
    path: '/gs-strategies/:id',
    handler: 'gs-strategy.findOne',
    config: { policies: [] }
  },
  {
    method: 'GET',
    path: '/gs-strategies/stocklist/:id',
    handler: 'gs-strategy.findOneStocks',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/gs-strategies',
    handler: 'gs-strategy.create',
    config: { policies: [] }
  },
]}
