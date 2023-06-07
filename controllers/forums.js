const express = require('express');
const router = express.Router();
const axios = require('axios');
const { forum } = require('../models');

router.get('/forums', function (req, res) {
    res.render('/forum-post');
});