const db = require("./database.js");

module.exports = {
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
