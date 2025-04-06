const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userSchemas = require('../validationSchemas/userSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post(
    "/login",
    validationMiddleware.validateRequest(userSchemas.loginSchema),
    controller.Login
);

module.exports = router;
