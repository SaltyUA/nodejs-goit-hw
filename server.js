const app = require("./app");
const setupMongoConnection = require("./service/setupMongoConnection.js");

const PORT = 3000;
setupMongoConnection().then(() =>
  app.listen(PORT, async () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
);
