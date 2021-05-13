const router = require('express').Router();

router.use('/auth', require('./auth')) 
router.use('/users', require('./users')) 
router.use('/biometrics', require('./biometrics')) 
router.use('/recipes', require('./recipes')) 

module.exports = router