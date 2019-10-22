require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const trieRouter = require('./trieRouter')
const rehydrate = require('./rehydrateTrie')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/trie', trieRouter)

async function init() {

    try {

        await rehydrate()

        app.listen(PORT, () => console.log(`Running on 3000`))

    } catch (err) {
        console.log('Something went wrong with initializing the app')
    }
}

init()