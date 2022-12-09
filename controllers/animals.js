const express = require('express')
const router = express.Router()
const Animal = require('../models/animals.js')

router.get('/', (req, res) => {
    Animal.find({}, (err, foundAnumal) => {
        res.json(foundAnumal);
    })
});

router.post('/', (req, res) => {
    Animal.create(req.body, (error, createdAnimal) => {
        res.json(createdAnimal);
    });
});

router.delete('/:id', (req, res) => {
    Animal.findByIdAndRemove(req.params.id, (error, deletedAnimal) => {
        res.json(deletedAnimal);
    });
});

router.put('/:id', (req, res) => {
    Animal.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedAnimal) => {
        res.json(updatedAnimal);
    })
});

module.exports = router