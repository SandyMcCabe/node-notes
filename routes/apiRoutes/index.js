var express = require('express')
var router = express.Router()

const notesRoutes = require('../apiRoutes/notesHTML');

router.use(notesRoutes);

module.exports = router;