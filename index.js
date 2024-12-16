const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = 3000

app.use(express.json())

const whiteList = ['http://127.0.0.1:5500', 'http://localhost:8080', 'http://localhost:3000']

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('origen no permitido'))
    }
  }
}

app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Server en express')
})

routerApi(app)

app.use(logErrors)

app.use(boomErrorHandler)

app.use(errorHandler)

app.listen(port, () => {
  console.log('Puerto abierto en ' + port)
})
