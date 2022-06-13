const reviewsService = require("./reviews.service");


function reviewExists (req, res, next) {
    const reviewId = req.params.reviewId;
    reviewsService
    .read(reviewId)
    .then((review) => {
        if (review) {
            res.locals.review = review;
            return next();
        }
        next({ status: 404, message: "Review cannot be found."})
    })
    .catch(next);
};

async function list (req, res, next) {
    const movieId = req.params.movieId;
    if (movieId) {
        reviewsService
        .list(movieId)
        .then((data) => res.json({ data }))
        .catch(next);
    }
    else {
        reviewsService
        .list()
        .then((data) => res.json({ data }))
        .catch(next);
    }
};

async function update (req, res, next) {
    const review_id = req.params.reviewId;
    const critic_id = res.locals.review.critic_id;
    const critic    = await reviewsService.readCritic(critic_id);
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    reviewsService
    .update(updatedReview)
    .then(() => {
        reviewsService
        .read(review_id)
        .then((review) => {
            review.critic = critic[0];
            return res.json({ data: review })            
        })
    })
    .catch(next)
};

function destroy (req, res,next) {
    const reviewId = res.locals.review.review_id;
    reviewsService
    .delete(reviewId)
    .then(() => res.sendStatus(204))
    .catch(next);
};



module.exports = {
    list,
    update: [reviewExists, update],
    delete: [reviewExists, destroy]
};