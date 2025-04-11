const { sql } = require("../configs/db.config");
const authUtils = require("../utils/authUtils");

const loginUser = async (loginData) => {
    const { username, password } = loginData;
    const result = await sql.query(
        `Select * From dbo.EntityT Where Username='${username}' and IsActive=1`
    );
    console.log("Result: ", result.recordset);
    if (result.recordset && result.recordset.length > 0) {
        const user = result.recordset[0];
        if (!user.TempPassword) {
            let passwordMatched = await authUtils.comparePassword(user.Password, password);
            if (!passwordMatched) {
                const error = new Error("Invalid Password!");
                error.code = 400;
                throw error;
            }
            let payload = {
                id: user.EntityID,
                username: user.Username,
            };
            let accessToken = authUtils.createAccessToken(payload);
            let refreshToken = authUtils.createRefreshToken(payload);
            await sql.query(
                `Update dbo.EntityT Set RefreshToken='${refreshToken}' where EntityID=${user.EntityID}`
            )
            return { accessToken, refreshToken, tempUser: false };

        } else {
            if (user.TempPassword !== password) {
                const error = new Error("Invalid Temp Password!");
                error.code = 400;
                throw error;
            } else {
                return { accessToken: null, refreshToken: null, tempUser: true };
            }
        }
    } else {
        const error = new Error("User Doesnt Exist with This Username!");
        error.code = 400;
        throw error;
    }
};

const setPassword = async (userData) => {
    const { username, password, newPassword } = userData;
    const result = await sql.query(
        `Select * From dbo.EntityT Where Username='${username}' and IsActive=1`
    );
    console.log("Result: ", result.recordset);
    if (result.recordset && result.recordset.length > 0) {
        const user = result.recordset[0];
        if (!user.TempPassword) {
            const error = new Error("Not Temp User!");
            error.code = 400;
            throw error;
        } else {
            if (user.TempPassword !== password) {
                const error = new Error("Invalid Temp Password!");
                error.code = 400;
                throw error;
            } else {
                let hashedPassword = await authUtils.hashPassword(newPassword);
                const result2 = await sql.query(
                    `Update dbo.EntityT Set TempPassword=Null, Password='${hashedPassword}' where EntityID='${user.EntityID}'`
                )
                if (result2.rowsAffected[0] <= 0) {
                    const error = new Error("Unable to set new password");
                    error.code = 400;
                    throw error;
                }
            }
        }
    } else {
        const error = new Error("User Doesnt Exist with This Username!");
        error.code = 400;
        throw error;
    }
};

const fetchOwnerEmail = async () => {
    const result = await sql.query(
        `Select ResetEmail From dbo.S_DefaultT`
    );
    console.log("Result: ", result.recordset);
    if (result.recordset && result.recordset.length > 0) {
        const defaultConfig = result.recordset[0];
        if (!defaultConfig.ResetEmail) {
            const error = new Error("Something Went Wrong!");
            error.code = 400;
            throw error;
        }
        return defaultConfig.ResetEmail;

    } else {
        const error = new Error("Something Went Wrong!");
        error.code = 400;
        throw error;
    }
};

module.exports = {
    loginUser,
    setPassword,
    fetchOwnerEmail
};
