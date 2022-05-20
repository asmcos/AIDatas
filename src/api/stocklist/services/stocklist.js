'use strict';

/**
 * stocklist service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stocklist.stocklist');
