const router = require('express').Router();
const userRoutes = require('./user-routes');
const linkRoutes = require('./link-routes');

router.use('/users', userRoutes);
router.use('/link', linkRoutes);

module.exports = router;
