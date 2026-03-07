const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCRUD = require("../CRUD/user-crud");
const { AppError, ErrorType } = require("../utility/appError");
require("dotenv").config();
const saltRounds = parseInt(process.env.SALT_ROUND) || 12;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;

class UserController {

    //user register
    async createUser(username, email, password) {
        //hash username
        const userWithSameUsername = await userCRUD.getUserByUsername(username);
        const userWithSameEmail = await userCRUD.getUserByEmail(email);
        if (userWithSameUsername || userWithSameEmail) {
            throw new AppError(
                `user already exist with same ${userWithSameUsername ? "username" : "email"}`,
                ErrorType.INVALID_INPUT,
            );
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await userCRUD.createUser(username, email, hashedPassword);
        return { message: "user create successfully" };
    }

    //user login
    async userLogIn(username, email, password) {
        if (!username && !email) {
            throw new AppError(
                "please provide username or email to sign in",
                ErrorType.INVALID_INPUT,
            );
        }
        let user = username
            ? await userCRUD.getUserByUsername(username)
            : await userCRUD.getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError("Invalid Credentials", ErrorType.INVALID_INPUT);
        }
        const userInfo = {
            id: user._id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            allowHistory: user.allowHistory,
            tier: user.tier
        };
        let signedToken = jwt.sign(userInfo, jwtSecret, {
            expiresIn: jwtExpirationTime,
        });
        return { message: `login succeed`, token: signedToken };
    }

    //user update username, email

    //request password reset & password reset with token

    //deactivate user

    //activate user

    //update user tier

    //enable/disable user history

    //delete user
}

module.exports = new UserController();
