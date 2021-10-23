const User = require('../models/User');

async function createUser(email, hashedPassword, gender) {
    const user = new User({email, hashedPassword, gender});
    await user.save();
    return user;
}


async function getUserByUsername(username) {
    const match = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: match } });
    return user;
}

async function getUserByEmail(email) {
    const match = new RegExp(`^${email}$`);
    const user = await User.findOne({ email: { $regex: match } });
    return user;
}


module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail
}