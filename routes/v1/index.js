const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/games', require('./games'));
router.use('/gameScreenshots', require('./gameScreenshots'));
router.use('/gameComments', require('./gameComments'));
router.use('/users', require('./users'));
router.use('/playlists', require('./playlists'));

module.exports = router;