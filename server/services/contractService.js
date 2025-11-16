const { sql } = require("../configs/db.config");

const getContracts = async (id) => {
  const result = await sql.query(
    `Select * From dbo.ContractT Where EntityID=${id} and IsActive=1`
  );
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
  const result = await sql.query(`Select CurrentQtr from dbo.S_DefaultT`);
  if (result.recordset && result.recordset.length > 0) {
    const CurrentQtr = result.recordset[0].CurrentQtr;
    const result2 = await sql.query(
      `Select * From dbo.ReportQ Where ContractID=${contractId} and ReportQtr='${CurrentQtr}'`
    );
    if (result2.recordset && result2.recordset.length > 0) {
      const records = result2.recordset;
      return records;
    } else {
      const error = new Error("Records Not Found Against This Contract!");
      error.code = 404;
      throw error;
    }
  } else {
    const error = new Error("Default Quater Not Found!");
    error.code = 404;
    throw error;
  }
};

const getMembersList = async () => {
  const result = await sql.query(
    `Select EntityID, EntityName From dbo.EntityT Where EntityGroupID='37' Order By EntityName`
  );
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
  const result = await sql.query(`Select CurrentQtr from dbo.S_DefaultT`);
  if (result.recordset && result.recordset.length > 0) {
    const CurrentQtr = result.recordset[0].CurrentQtr;
    // console.log("CurrentQtr: ", CurrentQtr);
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

const deleteRecord = async (recordId) => {
  const result = await sql.query(
    `Delete from dbo.ReportT Where ReportID=${recordId}`
  );
  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Delete Report!");
    error.code = 400;
    throw error;
  }
};

const updateRecord = async (data, recordId) => {
  const { MemberEntityID, ReportItem, ReportAmount } = data;
  const result = await sql.query(
    `Update dbo.ReportT set MemberEntityID=${MemberEntityID}, ReportItem='${ReportItem}',ReportAmount=${ReportAmount} where ReportID=${recordId}`
  );
  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Update Report!");
    error.code = 400;
    throw error;
  }
};

const getContactLastView = async (entityId) => {
  const result = await sql.query(
    `Select UserLastViewed From dbo.EntityT Where EntityID=${entityId}`
  );

  if (result.recordset && result.recordset.length > 0) {
    const lastView = result.recordset[0];
    return lastView;
  } else {
    const error = new Error("Last View Not Found!");
    error.code = 404;
    throw error;
  }
};

const updateContactLastView = async (entityId) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // months are 0-based
  const year = date.getFullYear();

  const formatted = `${month}-${day}-${year}`;

  const result = await sql.query(
    `Update dbo.EntityT Set UserLastViewed='${formatted}' Where EntityID=${entityId}`
  );

  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Update Last View!");
    error.code = 400;
    throw error;
  }
};

const getContactInfo = async (entityId) => {
  const result = await sql.query(
    `Select EntityName, LastVerified, Initials, UserLastViewed, UserLastChanged, UserVerifiedBy From dbo.EntityT Where EntityID=${entityId}`
  );

  if (result.recordset && result.recordset.length > 0) {
    const contactInfo = result.recordset[0];
    return contactInfo;
  } else {
    const error = new Error("Conatct Info Not Found!");
    error.code = 404;
    throw error;
  }
};

const updateUserLog = async (entityId, name) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // months are 0-based
  const year = date.getFullYear();

  const formatted = `${month}-${day}-${year}`;

  const result = await sql.query(
    `Update dbo.EntityT set UserLastChanged='${formatted}', UserVerifiedBy='${name || "N/A"}' where EntityID=${entityId}`
  );

  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Update User Log!");
    error.code = 400;
    throw error;
  }
};

const getContacts = async (entityId) => {
  const result = await sql.query(
    `Select ContactID, FirstName, LastName, Email from dbo.ContactT where EntityID=${entityId}`
  );

  if (result.recordset && result.recordset.length > 0) {
    const contacts = result.recordset;
    return contacts;
  } else {
    const error = new Error("Conatcts Not Found!");
    error.code = 404;
    throw error;
  }
};

const addContact = async (entityId, data) => {
  const { firstName, lastName, email } = data;
  const result = await sql.query(
    `Insert into dbo.ContactT (EntityID, FirstName, LastName, Email) VALUES (${entityId},'${firstName}','${lastName}','${email}')`
  );

  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Add Contact!");
    error.code = 400;
    throw error;
  }
};

const updateContact = async (contactId, data) => {
  const { firstName, lastName, email } = data;
  const result = await sql.query(
    `Update dbo.ContactT set FirstName='${firstName}', LastName='${lastName}', Email='${email}' where ContactID=${contactId}`
  );

  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Update Contact!");
    error.code = 400;
    throw error;
  }
};

const deleteContact = async (contactId) => {
  const result = await sql.query(
    `Delete from dbo.ContactT Where ContactID=${contactId}`
  );
  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Delete Contact!");
    error.code = 400;
    throw error;
  }
};

const getAddresses = async (entityId) => {
  const result = await sql.query(
    `Select AddressID, Address, Address2, City, State, ZIP, County, Country From dbo.AddressT Where EntityID=${entityId}`
  );

  if (result.recordset && result.recordset.length > 0) {
    const addresses = result.recordset;
    return addresses;
  } else {
    const error = new Error("Addresses Not Found!");
    error.code = 404;
    throw error;
  }
};

const addAddress = async (entityId, data) => {
  const { address, address2, city, state, zip, county, country } = data;
  const result = await sql.query(
    `Insert Into dbo.AddressT (EntityID, Address, Address2, City, State, ZIP, County, Country) VALUES (${entityId},'${address}','${address2}','${city}','${state}','${zip}','${county}','${country}')`
  );

  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Add Address!");
    error.code = 400;
    throw error;
  }
};

const updateAddress = async (addressId, data) => {
  const { address, address2, city, state, zip, county, country } = data;
  const result = await sql.query(
    `Update dbo.AddressT set Address='${address}',Address2='${address2}',City='${city}',State='${state}',ZIP='${zip}',County='${county}',Country='${country}' where AddressID=${addressId}`
  );

  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Update Address!");
    error.code = 400;
    throw error;
  }
};

const deleteAddress = async (addressId) => {
  const result = await sql.query(
    `Delete from dbo.AddressT Where AddressID=${addressId}`
  );
  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Delete Address!");
    error.code = 400;
    throw error;
  }
};

const getPhones = async (entityId) => {
  const result = await sql.query(
    `Select PhoneID, PhoneNumber, Ext From dbo.PhoneT Where EntityID=${entityId}`
  );

  if (result.recordset && result.recordset.length > 0) {
    const phones = result.recordset;
    return phones;
  } else {
    const error = new Error("Phones Not Found!");
    error.code = 404;
    throw error;
  }
};

const addPhone = async (entityId, data) => {
  const { phoneNumber, ext } = data;
  const result = await sql.query(
    `Insert Into dbo.PhoneT (EntityID, PhoneNumber, Ext) VALUES (${entityId},'${phoneNumber}','${ext}')`
  );

  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Add Phones!");
    error.code = 400;
    throw error;
  }
};

const updatePhone = async (phoneId, data) => {
  const { phoneNumber, ext } = data;
  const result = await sql.query(
    `Update dbo.PhoneT set PhoneNumber='${phoneNumber}',Ext='${ext}' where PhoneID=${phoneId}`
  );

  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Update Phones!");
    error.code = 400;
    throw error;
  }
};

const deletePhone = async (phoneId) => {
  const result = await sql.query(
    `Delete from dbo.PhoneT Where PhoneID=${phoneId}`
  );
  if (result.rowsAffected[0] <= 0) {
    const error = new Error("Unable To Delete Phone!");
    error.code = 400;
    throw error;
  }
};

module.exports = {
  getContracts,
  getRecordsByContract,
  getMembersList,
  addRecord,
  deleteRecord,
  updateRecord,
  getContactLastView,
  updateContactLastView,
  getContactInfo,
  updateUserLog,
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getPhones,
  addPhone,
  updatePhone,
  deletePhone
};
