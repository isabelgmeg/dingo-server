const express = require('express')
const cors = require('cors')
const { PORT } = require('./configs/constants')

const app = express()

require("./configs/db")

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
  next(new Error("Path Not Found"));
});

app.use('/dingo/api/', require('./routes'))

app.use((error, _, res, __) => {
  res.status(400).json({
    success: false,
    message: error.message,
  });
});

app.listen(PORT, () => console.info(`> Listening at http://localhost:${PORT}`));