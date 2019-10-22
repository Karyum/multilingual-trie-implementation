const dbConnection = require('../database/dbConnection')

WordsModel = module.exports = {}

WordsModel.addWord = (word, language) => new Promise(
    (resolve, reject) => dbConnection.query(
        'INSERT INTO words (word, language) VALUES ($1, $2)',
        [word, language],
        (err, res) => {
            if (err) {
                return reject(err)
            }

            return resolve(res.rows)
        }
    )
)

WordsModel.fetchAllWords = () => new Promise(
    (resolve, reject) => dbConnection.query(
        'Select word, language FROM words',
        (err, res) => {
            if (err) {
                return reject(err)
            }

            return resolve(res.rows)
        }
    )
)
