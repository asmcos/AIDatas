'use strict';

/**
 * week router.
 */


module.exports = {
 routes:[
  {
    method: 'GET',
    path: '/weeks',
    handler: 'week.find',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/weeks/updates',
    handler: 'week.updates',
    config: { policies: [] }
  },
]}

