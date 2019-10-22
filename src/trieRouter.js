const router = require('express').Router()
const trieController = require('./controllers/trieController')

router
    .route('/')
    .post(trieController.addWord)
    .get(trieController.fetch)

module.exports = router