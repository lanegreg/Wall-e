
const redisService = config => {
  const getAffiliateById = (id, cb) => {
    if(id != 45)
      cb('oops!')

    cb(null, {
      id: id,
      name: 'some affiliate\'s name',
      sayme: 'woohoo'
    })
  }

  return {
    getAffiliateById: getAffiliateById
  }
}

module.exports = redisService
