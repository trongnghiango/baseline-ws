// eslint-disable-next-line node/no-unpublished-require
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "KAKA API",
    description: "Description",
  },
  host: "localhost:9000",
  basePath: "/api/v1",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  definitions: {
    LoginBody: {
      $username: "khakhung",
      $password: "123abcxxx",
    },
    CreatedApiKey: {
      $key: "CCMUD90YvklWvyUNt9n3QtsNoSHzK7U986",
      $permissions: ["GENERAL", "QUAN"],
      $comments: ["To be used by the xyz vendor"],
      $version: 1,
    },
    CreatedRole: {
      $code: "CREATOR",
      $key: "CREATOR",
      $description: "CREATOR",
      $notes: "CREATOR",
    },
    schemas: {
      CreatedApiKeyBody: {
        $key: "",
        $permissions: ["GENERAL"],
        $comments: ["for agent"],
        $version: 1,
      },
    },
  },
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be 'header', 'query' or 'cookie'
      name: "X-TOKEN", // name of the header, query parameter or cookie
      description: "Some description...",
    },
  },
};

const outputFile = "./swagger.json";
const routes = ["./api/v1/routes/index.js"];

swaggerAutogen(outputFile, routes, doc).then(() => {
  // eslint-disable-next-line global-require
  require("./server");
});
