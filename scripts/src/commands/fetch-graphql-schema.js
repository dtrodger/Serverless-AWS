const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const config = require('../config')

const FRAGMENT_TYPES_DIR_PATH = path.join(
    path.dirname(require.main.filename),
    '..',
    'data',
    'graphql'
)

module.exports = function fetchGraphQLSchema() {
    fetch(config.GRAPHQL.URI, {
      method: 'POST',
      headers: config.GRAPHQL.HEADERS,
      body: JSON.stringify({
        variables: {},
        query: `
          {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `,
      }),
    })
    .then(result => result.json())
    .then(result => {
        const filteredData = result.data.__schema.types.filter(
          type => type.possibleTypes !== null,
        );
        result.data.__schema.types = filteredData;
        const fragmentTypesFilePath = path.join(FRAGMENT_TYPES_DIR_PATH, `${Math.floor(Date.now() / 1000)}-fragment_types.json`)
        fs.writeFile(fragmentTypesFilePath, JSON.stringify(result.data), err => {
          if (err) {
            console.error('Error writing fragmentTypes file', err);
          } else {
            console.log('Fragment types successfully extracted!');
          }
        });
    });
}
