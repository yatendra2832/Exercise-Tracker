const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercisemodel');

router.route('/').get(async (req, res) => {
    try {
        const exercise = await Exercise.find();
        return res.status(200).json({ exercise });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json('Error: ', error)
    }
})

router.route('/add').post(async (req, res) => {
    try {
        if (!req.body.username ||
            !req.body.description ||
            !req.body.duration ||
            !req.body.date) {
            return res.status(400).send({ message: 'All Fields are required' });
        }

        const newExercise = new Exercise({
            username: req.body.username,
            description: req.body.description,
            duration: Number(req.body.duration),
            date: Date.parse(req.body.date)
        });

        const exercise = await Exercise.create(newExercise);

        return res.status(201).send({ exercise });
    } catch (error) {
        console.log(error);
return res.status(500).send({message:err.message})
    }
})









module.exports = router;