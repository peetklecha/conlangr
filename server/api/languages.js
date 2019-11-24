const router = require('express').Router()
const {Language, seed} = require('../../logic')
module.exports = router

router.get('/', (req, res, next) => res.json(seed))
