require('dotenv').config()

const fs = require('fs');

const client = require('./dbConnection');

const schema = fs.readFileSync(`${__dirname}/schema.sql`).toString();

client.query(schema, (err, result) => {
    if (err) throw err;

    return console.log('BLUKU! Database build was successful');
});