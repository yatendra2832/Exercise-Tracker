const express = require('express');
const router = express.Router();
let User = require('../models/usermodel');
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
})

router.route('/add').post(async (req, res) => {
    try {
        const username = req.body.username;
        const newUser = new User({ username });
        const user = await newUser.save()
        return res.status(200).json({ user })
    } catch (error) {

    }
})

module.exports = router;