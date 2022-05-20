module.exports ={routes: [
    {
      method: 'POST',
      path: '/postfactors',
      handler: 'factormanager.postfactors',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/getfactors',
      handler: 'factormanager.getfactors',
      config: { policies: [] }
    },
  ]}