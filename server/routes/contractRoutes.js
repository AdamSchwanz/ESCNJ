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

router.post(
    "/add-record",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateRequest(contractSchemas.addRecord),
    controller.AddRecord
);

router.delete(
    "/delete-record/:recordId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.deleteRecord),
    controller.DeleteRecord
);

router.patch(
    "/update-record/:recordId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.updateRecordParams),
    validationMiddleware.validateRequest(contractSchemas.updateRecordBody),
    controller.UpdateRecord
);

router.get(
    "/get-contact-last-view",
    authMiddleware.authenticateRequest,
    controller.GetContactLastView
);

router.patch(
    "/update-contact-last-view",
    authMiddleware.authenticateRequest,
    controller.UpdateContactLastView
);

router.get(
    "/get-contact-info",
    authMiddleware.authenticateRequest,
    controller.GetContactInfo
);

module.exports = router;
