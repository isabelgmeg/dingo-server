const mongoose = require("mongoose");

const {DB_URI} = require('./constants');

mongoose
  .connect(DB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  .then(() => console.info("succesfully connected to mongoDB"))
  .catch((error) => {
    console.info("> error trying to connect to mongoDB", error.message);
    process.exit(0);
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.info("> mongoose succesfully disconnected");
    process.exit(0);
  });
});