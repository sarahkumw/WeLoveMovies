const theatersService = require("./theaters.service");


function list(req, res, next) {  
    if (req.params.movieId) {
        const movieId = req.params.movieId;
        theatersService
        .list(movieId)
        .then((data) => res.json({ data }))
        .catch(next);
    }
    else {
        theatersService
        .list()
        .then((data) => res.json({ data }))
        .catch(next)
    } 
};


module.exports = {
    list,
}