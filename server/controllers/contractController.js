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

module.exports = {
    GetContracts,
    GetRecordsByContract,
    GetMembersList,
    AddRecord,
    DeleteRecord,
    UpdateRecord,
    GetContactLastView,
    UpdateContactLastView,
    GetContactInfo
};
