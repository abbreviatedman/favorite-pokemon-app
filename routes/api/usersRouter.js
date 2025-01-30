const express = require('express');

const {createUser, addFavorite} = require('../../controllers/api/usersController');

const router = express.Router();

function handleErrorResponse(res, err) {
    console.log(err);
    res.status(500).json({message: 'failure', payload: err});
}

router.post('/', async function (req, res) {
    try {
        const user = await createUser(req.body);
        user.password = undefined;
        res.status(201).json({message: 'success', payload: user});
    } catch (error) {
        handleErrorResponse(res, error);
    }
})

router.patch('/', async function (req, res) {
    try {
        const user = await addFavorite(req.body.username, req.body.pokemonId)
        res.status(200).json({message: 'success', payload: user});
    } catch (error) {
        handleErrorResponse(res, error);
    }
})

module.exports = router;