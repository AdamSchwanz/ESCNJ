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

router.patch(
    "/update-user-log",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateRequest(contractSchemas.updateUserLog),
    controller.UpdateUserLog
);

router.get(
    "/get-contacts",
    authMiddleware.authenticateRequest,
    controller.GetContacts
);

router.post(
    "/add-contact",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateRequest(contractSchemas.addContact),
    controller.AddContact
);

router.put(
    "/update-contact/:contactId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.updateContactParams),
    validationMiddleware.validateRequest(contractSchemas.updateContactBody),
    controller.UpdateContact
);

router.delete(
    "/delete-contact/:contactId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.deleteContact),
    controller.DeleteContact
);

module.exports = router;
