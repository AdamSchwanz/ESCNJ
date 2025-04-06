const userService = require("../services/userService");

const Login = async (req, res, next) => {
    try {
        const data = { ...req.body };
        const { accessToken, refreshToken, tempUser } = await userService.loginUser(data);
        if (refreshToken) {
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
            });
        }
        res.status(200).json({ token: accessToken, tempUser });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    Login,
};
