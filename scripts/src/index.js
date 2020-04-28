const { program } = require('commander');
const fetchGraphQLSchema = require('./commands/fetch-graphql-schema');


function main(){
    program.version('0.0.1');
    program
        .command('fetch-graphql-schema')
        .alias('gqls')
        .description('Load a GraphQL schema to JSON')
        .action(function () {
            fetchGraphQLSchema();
        });
        program.parse(process.argv);
}

main();
