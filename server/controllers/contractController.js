const contractService = require("../services/contractService");

const GetContracts = async (req, res, next) => {
    try {
        const { id } = req.user;
        const contracts = await contractService.getContracts(id);
        res.status(200).json({ contracts });
    } catch (error) {
        next(error);
    }
};

const GetRecordsByContract = async (req, res, next) => {
    try {
        const { contractId } = req.params;
        const records = await contractService.getRecordsByContract(contractId);
        res.status(200).json({ records });
    } catch (error) {
        next(error);
    }
};

const GetMembersList = async (req, res, next) => {
    try {
        const members = await contractService.getMembersList();
        res.status(200).json({ members });
    } catch (error) {
        next(error);
    }
};

const AddRecord = async (req, res, next) => {
    try {
        const data = { ...req.body };
        await contractService.addRecord(data);
        res.status(201).json({ message: "Report Added Successfully!" });
    } catch (error) {
        next(error);
    }
};

const DeleteRecord = async (req, res, next) => {
    try {
        const { recordId } = req.params;
        await contractService.deleteRecord(recordId);
        res.status(200).json({ message: "Report Deleted Successfully!" });
    } catch (error) {
        next(error);
    }
};

const UpdateRecord = async (req, res, next) => {
    try {
        const { recordId } = req.params;
        const data = req.body;
        await contractService.updateRecord(data, recordId);
        res.status(200).json({ message: "Report Updated Successfully!" });
    } catch (error) {
        next(error);
    }
};

const GetContactLastView = async (req, res, next) => {
    try {
        const { id } = req.user;
        const lastView = await contractService.getContactLastView(id);
        res.status(200).json({ lastView });
    } catch (error) {
        next(error);
    }
};

const UpdateContactLastView = async (req, res, next) => {
    try {
        const { id } = req.user;
        await contractService.updateContactLastView(id);
        res.status(200).json({ message: "Last View Updated Successfully!" });
    } catch (error) {
        next(error);
    }
};

const GetContactInfo = async (req, res, next) => {
    try {
        const { id } = req.user;
        const contactInfo = await contractService.getContactInfo(id);
        res.status(200).json({ contactInfo });
    } catch (error) {
        next(error);
    }
};

const UpdateUserLog = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { name } = req.body;
        await contractService.updateUserLog(id, name);
        res.status(200).json({ message: "User Log Updated Successfully!" });
    } catch (error) {
        next(error);
    }
};

const GetContacts = async (req, res, next) => {
    try {
        const { id } = req.user;
        const contacts = await contractService.getContacts(id);
        res.status(200).json({ contacts });
    } catch (error) {
        next(error);
    }
};

const AddContact = async (req, res, next) => {
    try {
        const { id } = req.user;
        const data = req.body;
        await contractService.addContact(id, data);
        res.status(201).json({ message: "Contact Added Successfully!" });
    } catch (error) {
        next(error);
    }
};

const UpdateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const data = req.body;
        await contractService.updateContact(contactId, data);
        res.status(200).json({ message: "Contact Updated Successfully!" });
    } catch (error) {
        next(error);
    }
};

const DeleteContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        await contractService.deleteContact(contactId);
        res.status(200).json({ message: "Contact Deleted Successfully!" });
    } catch (error) {
        next(error);
    }
};





























const GetAddresses = async (req, res, next) => {
    try {
        const { id } = req.user;
        const addresses = await contractService.getAddresses(id);
        res.status(200).json({ addresses });
    } catch (error) {
        next(error);
    }
};

const AddAddress = async (req, res, next) => {
    try {
        const { id } = req.user;
        const data = req.body;
        await contractService.addAddress(id, data);
        res.status(201).json({ message: "Address Added Successfully!" });
    } catch (error) {
        next(error);
    }
};

const UpdateAddress = async (req, res, next) => {
    try {
        const { addressId } = req.params;
        const data = req.body;
        await contractService.updateAddress(addressId, data);
        res.status(200).json({ message: "Address Updated Successfully!" });
    } catch (error) {
        next(error);
    }
};

const DeleteAddress = async (req, res, next) => {
    try {
        const { addressId } = req.params;
        await contractService.deleteAddress(addressId);
        res.status(200).json({ message: "Address Deleted Successfully!" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    GetContracts,
    GetRecordsByContract,
    GetMembersList,
    AddRecord,
    DeleteRecord,
    UpdateRecord,
    GetContactLastView,
    UpdateContactLastView,
    GetContactInfo,
    UpdateUserLog,
    GetContacts,
    AddContact,
    UpdateContact,
    DeleteContact,
    GetAddresses,
    AddAddress,
    UpdateAddress,
    DeleteAddress
};
