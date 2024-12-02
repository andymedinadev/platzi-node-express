const express = require('express')
const routerApi = require('./routes')

const app = express()
const port = 3000

routerApi(app)

app.get('/', (req, res) => {
  res.send('Server en express')
})

app.listen(port, () => {
  console.log('Puerto abierto en ' + port)
})
