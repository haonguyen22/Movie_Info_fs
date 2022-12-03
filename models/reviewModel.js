const db = require("./database.js");

module.exports = {
    insertReviews: async (m) => {
        try {
            m.reviews.map(async (r) => {
                try {
                    await db.one('Insert into "Reviews" values ($1, $2, $3, $4, $5, $6, $7)', [
                        m.id,
                        r.author,
                        r.authorRating,
                        r.helpfulnessScore,
                        r.reviewText,
                        r.reviewTitle,
                        r.submissionDate,
                    ]);
                } catch (e) {
                    console.log(e);
                }
            });

            return data;
        } catch (e) {
            console.log(e);
        }
    },
    deleteReviews: async () => {
        try {
            await db.any('Delete from "Reviews"');
        } catch (e) {
            console.log(e);
        }
    },
};
