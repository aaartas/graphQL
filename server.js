var { graphql, buildSchema } = require("graphql");
// Expressを用いてAPIサーバを実行する場合、以下の２つをインポート
var express = require （'express' ）; 
var { graphqlHTTP } = require('express-graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
};

// Run the GraphQL query '{ hello }' and print out the response
//1. CLIでの実行

// graphql({
//   schema,
//   source: "{ hello }",
//   rootValue,
// }).then((response) => {
//   console.log(response);
// });

//2. APIサーバーからの実行（実際のアプリではこちら）
// 'express'モジュールを使用してWebサーバーを実行でき、graphql関数で直接クエリを実行する代わりに、express-graphqlライブラリを使用して「/graphql」HTTPエンドポイントにGraphQLAPIサーバーをマウントできます。

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //GraphiQLツールを使用して手動でGraphQLクエリを発行できるようになる
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
