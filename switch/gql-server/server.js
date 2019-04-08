var express = require('express');
var express_graphgl = require('express-graphql');
var {buildSchema} = require('graphql');

var schema = buildSchema(`
    type Query{
        message: String
    }
`);

var root = {
    message:()=>'Hello World'
};

var app = express();
app.use('/graphql',express_graphgl({
    schema : schema,
    rootValue : root,
    graphiql: true


}));

app.listen(4000, ()=> console.log('express gql'));