const express = require("express");
const userRouter = express.Router();
const userSettingRouter = require("./userSetting");

const userController = require("../../controllers/userController");
const historyController = require("../../controllers/historyController");
const validUserSchema = require("../../utility/schema/userSchema");

const { userAuthorization, userAuthorizationEmailNotVerified } = require("../middleware/auth");

userRouter.use("/setting", userAuthorization,  userSettingRouter);

userRouter.post("/register", (req, res, next) => {
    const validResult = validUserSchema.safeParse(req.body);
    if (!validResult.success) {
        return res.status(400).json({message: validResult.error.issues.map((error) => error.message).join(" ")});
    }
    const { username, email, password } = req.body;
    return userController
        .createUser(username, email, password)
        .then((result) => res.status(201).json(result))
        .catch(next);
});

userRouter.post("/login", (req, res, next) => {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
        return res.status(400).json({
            message: "Provide username or email, and password to login",
        });
    }
    return userController
        .userLogIn(username, email, password)
        .then((result) => res.status(200).json(result))
        .catch(next);
});

userRouter.get("/info",  userAuthorizationEmailNotVerified, (req, res, next) => {
    return userController
        .getUserInfoById(req.user.id)
        .then((result) => res.status(200).json({
            username: result.username,
            email: result.email,
            plan: result.plan,
            emailVerified: result.emailVerified
        }))
        .catch(next);
});

userRouter.get("/history/full", userAuthorization, (req, res, next) => {
    return historyController
        .getUserHistory(req.user.id)
        .then((results) => res.status(200).json(results.map(result => ({
            id: result._id,
            spread: result.spread,
            tarots: result.tarots,
            createdAt: result.createdAt
        }))))
        .catch(next);
});

module.exports = userRouter;
