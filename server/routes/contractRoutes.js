const router = require("express").Router();
const controller = require("../controllers/contractController");
const authMiddleware = require("../middleware/authMiddleware");
const contractSchemas = require('../validationSchemas/contractSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
    "/get-contracts",
    authMiddleware.authenticateRequest,
    controller.GetContracts
);

router.get(
    "/get-records-by-contract/:contractId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.getRecords),
    controller.GetRecordsByContract
);

router.get(
    "/get-members-list",
    authMiddleware.authenticateRequest,
    controller.GetMembersList
);


module.exports = router;
