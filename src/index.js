const express = require('express')

const app = express()

require("./configs/db")
const { PORT } = require('./configs/constants')


app.listen(PORT, () => console.info(`> Listening at http://localhost:${PORT}`));