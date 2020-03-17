const express = require("express");
const app = express();
const PORT = 3001;
const path = require("path");
const graphqlHTTP = require("express-graphql");
const sequelize = require("./utils/database");
const schema = require("./graphQL/schema");
const resolver = require("./graphQL/resolver");

app.use(express.json());
app.use(
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => `Server is running on ${PORT}...`);
  } catch (err) {
    console.log("ERROR: ", err);
  }
})();
