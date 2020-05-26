const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET '
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'POST '
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product'
    });
});

module.exports = router;