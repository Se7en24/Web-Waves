const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const bookingRoutes = require('./bookingRoutes');
const portRoutes = require('./portRoutes');

router.use('/auth', authRoutes);


router.use('/admin', adminRoutes);

router.use('/booking', bookingRoutes);

router.use('/port', portRoutes)

module.exports = router