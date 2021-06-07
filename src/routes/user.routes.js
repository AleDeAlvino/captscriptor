const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('hola mundo');
});

module.exports = router;