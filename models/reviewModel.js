const db = require("./database.js");
const pageSize = 2 ;

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
        } catch (e) {
            console.log(e);
        }
    },
    getReviewByID: async (id, page = 1) => {
        try {
            const size = await db.one(`SELECT count(*) FROM "Reviews" where "movie_id" = $1`, [id]);
            const pageTotal = Math.ceil(parseInt(size.count) / pageSize);
            const offset = (page - 1) * pageSize;
            const data = await db.any(
                `SELECT * FROM "Reviews" where "movie_id" = $1  LIMIT ${pageSize} OFFSET ${offset}`,
                [id],
            );
            return { data, pageTotal };
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
