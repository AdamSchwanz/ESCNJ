const { sql } = require("../configs/db.config");

const getContracts = async (id) => {
    const result = await sql.query(
        `Select * From dbo.ContractT Where EntityID=${id} and IsActive=1`
    );
    console.log("Result: ", result.recordset);
    if (result.recordset && result.recordset.length > 0) {
        const contracts = result.recordset;
        return contracts;
    } else {
        const error = new Error("Contracts Not Found!");
        error.code = 404;
        throw error;
    }
};

const getRecordsByContract = async (contractId) => {
    const result = await sql.query(
        `Select * From dbo.ReportQ Where ContractID=${contractId}`
    );
    console.log("Result: ", result.recordset);
    if (result.recordset && result.recordset.length > 0) {
        const records = result.recordset;
        return records;
    } else {
        const error = new Error("Records Not Found Against This Contract!");
        error.code = 404;
        throw error;
    }
};

const getMembersList = async () => {
    const result = await sql.query(
        `Select EntityID, EntityName From dbo.EntityT Where EntityGroup='Member'`
    );
    console.log("Result: ", result.recordset);
    if (result.recordset && result.recordset.length > 0) {
        const members = result.recordset;
        return members;
    } else {
        const error = new Error("Members Not Found!");
        error.code = 404;
        throw error;
    }
};

const addRecord = async (data) => {
    const { ContractID, MemberEntityID, ReportAmount, ReportItem } = data;
    const result = await sql.query(
        `Select CurrentQtr from dbo.S_DefaultT`
    );
    console.log("Result: ", result.recordset);
    if (result.recordset && result.recordset.length > 0) {
        const CurrentQtr = result.recordset[0].CurrentQtr;
        console.log("CurrentQtr: ", CurrentQtr);
        const result2 = await sql.query(
            `Insert Into dbo.ReportT (ContractID, MemberEntityID, ReportItem, ReportAmount, ReportQtr) Values (${ContractID},${MemberEntityID},'${ReportItem}',${ReportAmount},'${CurrentQtr}')`
        );
        if (result2.rowsAffected[0] <= 0) {
            const error = new Error("Unable To Add Record!");
            error.code = 400;
            throw error;
        }
    } else {
        const error = new Error("Default Quater Not Found!");
        error.code = 404;
        throw error;
    }
};

module.exports = {
    getContracts,
    getRecordsByContract,
    getMembersList,
    addRecord
};
