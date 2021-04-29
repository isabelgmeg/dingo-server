const express = require('express')

const app = express()

require("./configs/db")
const {PORT} = require('./configs/constants')

app.listen(3000, () => {
  console.log(`'App listening in http://localhost:${PORT}'`)
}) 