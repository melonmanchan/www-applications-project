const client = require('mongodb').MongoClient

const cors = require('@koa/cors');
const ua = require('useragent')
const R = require('ramda')
ua(true)
const koa = require('koa')
const bodyParser = require('koa-bodyparser');
const route = require('koa-route')
const app = new koa()

app.use(cors())
app.use(bodyParser())

const url = 'mongodb://localhost:27017/www';

async function setUpApp() {
  const db = await client.connect(url)
  const collection = db.collection('results')

  app.use(route.post('/fibonacci', async (ctx) => {
    try {
      const agent = ctx.request.header['user-agent'] || ctx.request.header['x-user-agent']
      const userAgent = ua.parse(agent)
      const { type } = ctx.request.body

      userAgent.os
      userAgent.device

      const { family, major, minor, patch } = userAgent.toJSON()

      const browser = {
        family,
        major,
        minor,
        patch
      }

      const data = {
        type: type,
        browser: browser,
        device: userAgent.device,
        os: userAgent.os,
        raw: agent,
        data: ctx.request.body || {}
      }

      await collection.insertOne(data)
      ctx.response.statusCode = 200
      ctx.response.body = data
    } catch (e) {
      console.error(e)
      ctx.response.statusCode = 500
      ctx.response.body = e
    }
  }))

  app.use(route.get('/fibonacci', async (ctx) => {
    try {
      const data = await collection.find().toArray()
      ctx.response.statusCode = 200
      ctx.response.body = data
    } catch (e) {
      console.error(e)
      ctx.response.statusCode = 500
      ctx.response.body = e
    }
  }))

  console.log('app listening on port 3000')

  app.listen(3000)
}

setUpApp()
