const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function readCritic(criticId) {
    return knex ("critics")
    .select("*")
    .where({ "critic_id": criticId })
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
})

function list(movieId = null) {
    if (movieId) {
        return knex ("reviews")
        .join("critics", "reviews.critic_id", "=", "critics.critic_id")
        .select("*")
        .where({ "movie_id": movieId })
        .then((reviews) => Promise.all(reviews.map(addCritic)))
    }
    return knex ("reviews")
    .select("*")
};

function read (reviewId) {
    return knex ("reviews")
    .select("*")
    .where({ "review_id": reviewId })
    .first()
}

function update (updatedReview) {
    return knex ("reviews")
    .select("*")
    .where({ "review_id": updatedReview.review_id })
    .update(updatedReview, "*")
}

function destroy(reviewId) {
    return knex ("reviews")
    .where({ "review_id": reviewId })
    .del();
}



module.exports = {
    list,
    readCritic,
    read,
    update,
    delete: destroy,
};