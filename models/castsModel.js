const db = require("./database.js");
const pageSize = 4;

module.exports = {
    getCastsSortBirthDate: async (page = 1) => {
        try {
            const size = await db.one('select count(*) from "Casts"');
            const pageTotal = Math.ceil(parseInt(size.count) / pageSize);
            const offset = (page - 1) * pageSize;
            const data = await db.any(
                `SELECT * FROM "Casts" Order by "birthDate" DESC LIMIT ${pageSize} OFFSET ${offset}`,
            );
            return {
                data,
                pageTotal,
            };
        } catch (e) {
            console.log(e);
        }
    },
    insertCast: async (c) => {
        try {
            await db.any('Delete from "Casts" ');
            const data = await db.one('Insert into "Casts" values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
                c.id,
                c.image,
                c.legacyNameText,
                c.name,
                c.realName,
                c.birthDate,
                c.birthPlace,
                c.gender,
                c.heightCentimeters,
            ]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    deleteCasts: async () => {
        try {
            await db.any('Delete from "Casts"');
        } catch (e) {
            console.log(e);
        }
    },
};
