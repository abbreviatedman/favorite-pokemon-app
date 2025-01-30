const Pokemon = require('../../models/Pokemon');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

/*
USERS:

Colin, excelsior
abbreviatedman, abc123
me, letmein
pokemonlover, pika

*/

async function createUser(userData) {
    try {
        const salt = await bcrypt.genSalt(14);
        const encryptedPassword = await bcrypt.hash(userData.password, salt)
        const newUserData = {
            username: userData.username,
            password: encryptedPassword,
            favoritePokemon: [],
        }

        const newUser = await User.create(newUserData);

        return newUser;
    } catch (error) {
        throw error;
    }
}

const addFavorite = async (username, pokemonId) => {
    try {
        const user = await User.findOne({username: username});
        if (!user) {
            throw "No user found with that username."
        }

        if (await Pokemon.findById(pokemonId) === null) {
            throw "No pokemon found with that id."
        }

        user.favoritePokemon.addToSet(pokemonId);
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    addFavorite,
}