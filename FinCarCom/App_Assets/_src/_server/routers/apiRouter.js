
const express = require('express')
  , apiRouter = express.Router()
  , affiliateController = require('../controllers/affiliateController')
  , sqlService = require('../services/sqlService')(require('../config/sql'))
  , redisService = require('../services/redisService')(require('../config/redis'))
  , appInitData = require('../meta/appInitData')

apiRouter.route('/affiliate/:id')
  .get(affiliateController(sqlService).getById)

apiRouter.route('/app-init-data')
  .get((req, res) => {
    res.send(appInitData)
  })

module.exports = apiRouter
