const jwt = require("jsonwebtoken");
const userController = require("../../controllers/userController");

//only check if user is logged in. Don't don anything if not logged in
const userAuthentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : "";
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //check if user is active
            const user = await userController.getUserInfoById(decoded.id);
            if (!user) return res.status(404).json({message: `user does not exist`});
            if (!user.isActive) {
                return res.status(401).json({ message: "inactive user" });
            }
            req.user = {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                plan: user.plan,
                emailVerified: user.emailVerified
            };
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res
                    .status(401)
                    .json({ message: "Session expired, please login again" });
            }
            return res.status(401).json({ message: "Invalid token" });
        }
    }
    //don't do anything if user not loggin. userAuthorization will handle it.
    next();
};

const userAuthorizationEmailNotVerified = (req, res, next) => {
    //Check for valid user info. if not, send error
    if (!req.user) {
        return res
            .status(401)
            .json({ message: "Unauthorized, login to use this feature" });
    }
    next();
};

const userAuthorization = (req, res, next) => {
    //Check for valid user info. if not, send error
    if (!req.user) {
        return res
            .status(401)
            .json({ message: "Unauthorized, login to use this feature" });
    }
    if (!req.user.emailVerified) {
        return res.status(401).json({message: "User email not verified."});
    }
    next();
};

module.exports = { userAuthentication, userAuthorizationEmailNotVerified, userAuthorization };
