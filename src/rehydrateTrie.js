const { Words } = require('./models')
const Trie = require('./Trie')

module.exports = () => new Promise(
    async (resolve, reject) => {
        try {

            const allWords = await Words.fetchAllWords()

            allWords.forEach(({ word, language }) =>
                Trie.insert(word, language)
            );

            resolve()

        } catch (err) {

            reject(err)

        }
    })

