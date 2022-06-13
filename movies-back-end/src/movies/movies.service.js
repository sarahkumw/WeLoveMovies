const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
};

function listShowing() {
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "=", "movies_theaters.movie_id")
        .distinct(
            "movies.movie_id", 
            "movies.title",
            "movies.runtime_in_minutes",
            "movies.rating",
            "movies.description",
            "movies.image_url"
        )
        .where("is_showing", true)
};

function read(movieId) {
    return knex("movies")
    .select("*")
    .where({ movie_id: movieId });
};



module.exports = {
    list,
    listShowing,
    read,
};