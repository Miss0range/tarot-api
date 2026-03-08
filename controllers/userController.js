const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const email = require("../utility/email");//TODO: add email verification url

const userCRUD = require("../CRUD/user-crud");
const userSettingCRUD = require("../CRUD/userSetting-crud");
const { AppError, ErrorType } = require("../utility/appError");
const saltRounds = parseInt(process.env.SALT_ROUND) || 12;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;

if (!jwtSecret || !jwtExpirationTime) {
    throw new AppError(
        "Environment variables not load",
        ErrorType.INTERNAL_ERROR,
        "User Controller - TOP",
    );
}

class UserController {
    //user register
    async createUser(username, email, password) {
        const [userWithSameUsername, userWithSameEmail] = await Promise.all([
            userCRUD.getUserByUsername(username),
            userCRUD.getUserByEmail(email),
        ]);
        if (userWithSameUsername || userWithSameEmail) {
            throw new AppError(
                `user already exist with same ${userWithSameUsername ? "username" : "email"}`,
                userWithSameUsername
                    ? ErrorType.USERNAME_IN_USE
                    : ErrorType.EMAIL_IN_USE,
                "User Controller - createUser",
            );
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await userCRUD.createUser(username, email, hashedPassword);
        await userSettingCRUD.createDefaultUserSetting(user._id);
        return { message: "user create successfully" };
    }

    //user login
    async userLogIn(username, email, password) {
        if (!username && !email) {
            throw new AppError(
                "please provide username or email to sign in",
                ErrorType.INVALID_INPUT,
                "User Controller - userLogIn",
            );
        }
        let user = username
            ? await userCRUD.getUserByUsername(username)
            : await userCRUD.getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError(
                "Invalid Credentials",
                ErrorType.INVALID_INPUT,
                "User Controller - userLogIn",
            );
        }
        const userInfo = {
            id: user._id,
        };
        let signedToken = jwt.sign(userInfo, jwtSecret, {
            expiresIn: jwtExpirationTime,
        });
        return { message: `login succeed`, token: signedToken };
    }

    //get user info
    async getUserInfoById(userId) {
        return await userCRUD.getUserById(userId);
    }

    //user update username
    async updateUsername(userId, username) {
        return await userCRUD.updateUsername(userId, username);
    }

    //user update email
    async updateEmail(userId, email) {
        return await userCRUD.updateUserEmail(userId, email);
    }

    async #createToken() {
        //TODO
        //Create Token
    }

    async #sendVerificationEmail() {
        //TODO
    }

    async #verifyToken() {
        //TODO
        //
    }

    //request password reset & password reset with token

    //deactivate user

    //activate user

    //update user tier

    //delete user (call deleteHistoryByUserId here)
}

module.exports = new UserController();
