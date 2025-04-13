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

module.exports = {
    GetContracts,
    GetRecordsByContract,
    GetMembersList
};
