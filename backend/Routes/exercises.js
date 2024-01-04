const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercisemodel');

// getting  all exercise
router.route('/').get(async (req, res) => {
    try {
        const exercise = await Exercise.find();
        return res.status(200).json(exercise);
    } catch (error) {
        console.log(error.message);
        return res.status(404).send('Error: ', error.message)
    }
})

// getting exercise by Id
router.route('/:id').get(async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        return res.status(200).json({ exercise });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Error:', error.message);
    }
})

// route for creating the exercise
router.route('/add').post(async (req, res) => {
    try {
        if (!req.body.username ||
            !req.body.description ||
            !req.body.duration ||
            !req.body.date) {
            return res.status(404).send({ message: 'All Fields are required' });
        }

        const newExercise = new Exercise({
            username: req.body.username,
            description: req.body.description,
            duration: Number(req.body.duration),
            date: Date.parse(req.body.date)
        });

        const exercise = await Exercise.create(newExercise);

        return res.status(200).json({ exercise });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message })
    }
})

// route for updating the exercise
router.route('/update/:id').put(async (req, res) => {
    try {
        if (!req.body.username || !req.body.description || !req.body.duration || !req.body.date) { return res.status(400).send("All Fields are required") }
        const updatedExercise = {
            username: req.body.username,
            description: req.body.description,
            duration: Number(req.body.duration),
            date: Date.parse(req.body.date)
        }

        const exercise = await Exercise.findByIdAndUpdate(req.params.id, updatedExercise, { new: true });

        if (!exercise) return res.status(400).send({ message: "Exercise not found" })

        return res.status(200).json({ exercise })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message)
    }
})

// route for deleting the exercise
router.route('/delete/:id').delete(async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        return res.status(200).send({ exercise });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error:', error.message)
    }
})

module.exports = router;