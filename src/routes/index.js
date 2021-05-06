const router = require('express').Router();


router.use('/auth', require('./auth')) 
router.use('/users', require('./users')) 
router.use('/biometrics', require('./biometrics')) 

module.exports = router