const koa = require('koa')
const app = new koa()

app.use(async (ctx) => {
  ctx.body = 'hi'
  ctx.response.statusCode = 200
})

app.listen(3000)
