const client = require('mongodb').MongoClient

const koa = require('koa')
const bodyParser = require('koa-bodyparser');
const route = require('koa-route')
const app = new koa()

app.use(bodyParser())

const url = 'mongodb://localhost:27017/www';

async function setUpApp() {
  const db = await client.connect(url)

  app.use(route.post('/api', async (ctx) => {
    ctx.body = 'hi'
    ctx.response.statusCode = 200
  }))

  app.listen(3000)
}

setUpApp()
