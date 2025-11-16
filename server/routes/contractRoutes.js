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

router.get(
    "/get-addresses",
    authMiddleware.authenticateRequest,
    controller.GetAddresses
);

router.post(
    "/add-address",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateRequest(contractSchemas.addAddress),
    controller.AddAddress
);

router.put(
    "/update-address/:addressId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.updateAddressParams),
    validationMiddleware.validateRequest(contractSchemas.updateAddressBody),
    controller.UpdateAddress
);

router.delete(
    "/delete-address/:addressId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.deleteAddress),
    controller.DeleteAddress
);

router.get(
    "/get-phones",
    authMiddleware.authenticateRequest,
    controller.GetPhones
);

router.post(
    "/add-phone",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateRequest(contractSchemas.addPhone),
    controller.AddPhone
);

router.put(
    "/update-phone/:phoneId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.updatePhoneParams),
    validationMiddleware.validateRequest(contractSchemas.updatePhoneBody),
    controller.UpdatePhone
);

router.delete(
    "/delete-phone/:phoneId",
    authMiddleware.authenticateRequest,
    validationMiddleware.validateParams(contractSchemas.deletePhone),
    controller.DeletePhone
);

module.exports = router;
