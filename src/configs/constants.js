const constants = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/dingo'
};
  
module.exports = constants;