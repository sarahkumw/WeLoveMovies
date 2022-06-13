const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");


const reduceMovies = reduceProperties("theater_id", 
    {
        "movie_id": ["movies", null, "movie_id"],
        "title": ["movies", null, "title"],
        "runtime_in_minutes": ["movies", null, "runtime_in_minutes"],
        "rating": ["movies", null, "rating"],
        "description": ["movies", null, "description"],
        "image_url": ["movies", null, "image_url"],
        "created_at": ["movies", null, "created_at"],
        "updated_at": ["movies", null, "updated_at"],
        "is_showing": ["movies", null, "is_showing"],
        "theater_id": ["movies", null, "theater_id"]
    });


function list(movieId = null) {
    if (movieId) {
        return knex("theaters")
        .join("movies_theaters", "theaters.theater_id", "=", "movies_theaters.theater_id")
        .select("*")
        .where({ 
            "movies_theaters.movie_id": movieId,
            "movies_theaters.is_showing": true
         })
    }
    else {
        return knex("movies_theaters")
        .join("movies", "movies_theaters.movie_id", "=", "movies.movie_id")
        .join("theaters", "movies_theaters.theater_id", "=", "theaters.theater_id")
        .select("*")
        .where({ "movies_theaters.is_showing": true })
        .then(reduceMovies)
    }
};



module.exports = {
    list,
};