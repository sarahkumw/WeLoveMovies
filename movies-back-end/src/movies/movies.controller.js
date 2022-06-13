const moviesService = require("./movies.service");


function list(req, res, next) {
    if (req.query.is_showing) {
        moviesService
        .listShowing()
        .then((data) => res.json({ data }))
        .catch(next);
    }
    else {
        moviesService
        .list()
        .then((data) => res.json({ data }))
        .catch(next);
    }
};

function listTheaters(req, res, next) {
    moviesService
    .listTheaters(req.params.movieId)
    .then((data) => res.json({ data }))
    .catch(next)
};

function movieExists(req, res, next) {
    moviesService
    .read(req.params.movieId)
    .then((movie) => {
        if (movie.length > 0) {
          res.locals.movie = movie[0];
          return next();
        }
        else {
            next({ status: 404, message: `Movie cannot be found.` });
        }
      })
    .catch(next);
  }

function read(req, res) {
    const { movie: data } = res.locals;
    res.json({ data });
}


module.exports = {
    list,
    listTheaters,
    read: [movieExists, read],
};