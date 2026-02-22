const User = require("../models/user");

class UserCRUD {
    //TODO : in controller, verify parameters are not empty string
    async createUser(username, email, password) {
        return await User.create({
            username,
            email,
            password,
        });
    }
    async getUserById(userId) {
        return await User.findById(userId);
    }

    async getUserByUsername(username) {
        return await User.findOne({ username });
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async updateUsername(userId, newUsername) {
        return await User.findByIdAndUpdate(
            userId,
            { username: newUsername },
            { new: true, runValidators: true },
        );
    }

    async updateUserEmail(userId, newEmail) {
        return await User.findByIdAndUpdate(
            userId,
            { email: newEmail },
            { new: true, runValidators: true },
        );
    }

    async updateUserPassword(userId, newPassword) {
        return await User.findByIdAndUpdate(
            userId,
            { password: newPassword },
            { new: true, runValidators: true },
        );
    }

    async deactivateUser(userId) {
        return await User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true, runValidators: true },
        );
    }

    async activateUser(userId) {
        return await User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true, runValidators: true },
        );
    }

    async updateUserTier(userId, newTier) {
        return await User.findByIdAndUpdate(
            userId,
            { tier: newTier },
            { new: true, runValidators: true },
        );
    }

    async deleteUser(userId) {
        // history not implemented yet
        // await History.deleteUserHistory(userId);
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserCRUD();
