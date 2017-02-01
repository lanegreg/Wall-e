
const affiliateController = service => {
  const getById = (req, res) => {
    service.getAffiliateById(req.params.id, (err, data) => {
      if(err)
        res.send(err)

      res.send(data)
    })
  }

  return {
    getById: getById
  }
}

module.exports = affiliateController
