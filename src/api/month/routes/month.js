'use strict';

/**
 * month router.
 */

module.exports = {
 routes:[
  {
    method: 'GET',
    path: '/months',
    handler: 'month.find',
    config: { policies: [] }
  },
  {
    method: 'POST',
    path: '/months/updates',
    handler: 'month.updates',
    config: { policies: [] }
  },
]}

