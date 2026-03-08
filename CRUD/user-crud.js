const User = require("../models/user");
const { AppError, ErrorType } = require("../utility/appError");
const { InternalRoles } = require("../utility/role");

class UserCRUD {
    async createUser(username, email, password) {
        return await User.create({
            username,
            email,
            password,
        });
    }

    async createInternalAccount(username, email, password, role) {
        if (!InternalRoles.includes(role)) {
            throw new AppError(
                `Invalid Internal Role : ${role}`,
                ErrorType.INVALID_INPUT,
                "User CRUD - createInternalAccount",
            );
        }
        return await User.create({
            username,
            email,
            password,
            role,
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

    async updateUserPlan(userId, newPlan) {
        return await User.findByIdAndUpdate(
            userId,
            { plan: newPlan },
            { new: true, runValidators: true },
        );
    }

    async verifyEmail(userId) {
        return await User.findByIdAndUpdate(
            userId,
            { emailVerified: true },
            { new: true, runValidators: true },
        );
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserCRUD();
