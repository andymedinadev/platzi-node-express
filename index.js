const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Server en express')
})

app.listen(port, () => {
  console.log('Puerto abierto en ' + port)
})
