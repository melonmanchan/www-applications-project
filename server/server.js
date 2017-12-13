const client = require("mongodb").MongoClient;
const parseUserAgent = require("./middleware/useragent");
const cors = require("@koa/cors");
const R = require("ramda");
const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const route = require("koa-route");
const app = new koa();

app.use(cors());
app.use(bodyParser());

const url = "mongodb://localhost:27017/www";

async function setUpApp() {
  const db = await client.connect(url);

  app.use(parseUserAgent);

  app.use(
    route.post(
      "/measurements/:measurementType",
      async (ctx, measurementType) => {
        try {
          const collection = db.collection(`results_${measurementType}`);
          const { type } = ctx.request.body;

          const data = {
            ...ctx.request.data,
            type: type,
            data: ctx.request.body || {}
          };

          console.log(data);
          await collection.insertOne(data);
          ctx.response.statusCode = 200;
          ctx.response.body = data;
        } catch (e) {
          console.error(e);
          ctx.response.statusCode = 500;
          ctx.response.body = e;
        }
      }
    )
  );

  app.use(
    route.get(
      "/measurements/:measurementType",
      async (ctx, measurementType) => {
        var browser = ctx.request.query.browser || undefined;
        const collection = db.collection(`results_${measurementType}`);
        try {
          var data;
          if (typeof browser === "undefined") {
            data = await collection.find().toArray();
          } else {
            switch (browser.toLowerCase()) {
              case "chrome":
                browser = "Chrome";
                break;
              case "internet explorer":
                browser = "IE";
                break;
              case "safari_mobile":
                browser = "Mobile Safari";
                break;
              case "android":
                browser = "Chrome Mobile";
                break;
              case "edge":
                browser = "Edge";
                break;
              case "safari":
                browser = "Safari";
                break;
              case "firefox":
                browser = "Firefox";
                break;
            }
            data = await collection
              .find({ "browser.family": browser })
              .toArray();
          }

          ctx.response.statusCode = 200;
          ctx.response.body = data;
        } catch (e) {
          console.error(e);
          ctx.response.statusCode = 500;
          ctx.response.body = e;
        }
      }
    )
  );

  app.use(
    route.post("/error", async ctx => {
      const collection = db.collection(`errors`);

      const data = {
        ...ctx.request.data,
        errorArguments: ctx.request.body.errorArguments
      };

      console.error("Something went wrong during browserstack run", data);

      await collection.insertOne(data);
      ctx.response.statusCode = 200;
      ctx.response.body = data;
    })
  );

  console.log("app listening on port 3000");

  app.listen(3000);
}

setUpApp();
