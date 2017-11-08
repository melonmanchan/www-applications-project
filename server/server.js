const client = require('mongodb').MongoClient

const ua = require('useragent')
ua(true)
const koa = require('koa')
const bodyParser = require('koa-bodyparser');
const route = require('koa-route')
const app = new koa()

app.use(bodyParser())

const url = 'mongodb://localhost:27017/www';

async function setUpApp() {
  const db = await client.connect(url)
  const collection = db.collection('results')

  app.use(route.post('/fibonacci', async (ctx) => {
    const agent = ctx.request.header['user-agent'] || ctx.request.header['x-user-agent']
    const userAgent = ua.parse(agent)
    const data = {
      browser: userAgent,
      data: ctx.request.body || {}
    }

    await collection.insertOne(data)
    ctx.response.statusCode = 200
    ctx.response.body = data
  }))

  console.log('app listening on port 3000')

  app.listen(3000)
}

setUpApp()
