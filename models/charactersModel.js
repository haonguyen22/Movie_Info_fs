const db = require("./database.js");

module.exports = {
    insertCharacter: async (m) => {
        await db.any('Delete from "Characters" ');
        await m.casts.map(async (c) => {
            await c.characters.map(async (cha) => {
                try {
                    await db.one('Insert into "Characters" values ($1, $2, $3)', [m.id, c.id, cha]);
                } catch (e) {
                    console.log(e);
                }
            });
        });
    },
    deleteCharacters: async () => {
        try {
            await db.any('Delete from "Characters"');
        } catch (e) {
            console.log(e);
        }
    },
};
