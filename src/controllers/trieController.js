const Trie = require('../Trie')
const { Words } = require('../models')

const TrieCotroller = module.exports = {}

// Maybe add some error handling
TrieCotroller.addWord = async (req, res) => {
    const { word: newWord, language } = req.body

    Trie.insert(newWord, language)

    const dbResponse = await Words.addWord(newWord, language)
    console.log(1)
    console.log(dbResponse)

    res.status(200).send(true)
}

TrieCotroller.fetch = (req, res) => {
    const { word, prefix, language } = req.query

    const responseObject = {
        word: {},
        result: []
    }

    if (word) {
        responseObject.word = {
            exsists: Trie.contains(word, language),
            word
        }
    }

    if (prefix) {
        responseObject.result = Trie.find(prefix, language)
    }

    res.status(200).send(responseObject)
}