// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
    // find all movie in the books collection
    movies.find((err, list) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('movies/index', {
                title: 'Movies',
                list: list
            });
        }
    });

});

//  GET the Movies Details page in order to add a new Movies
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('movies/details', { title: 'Add Movie', list: 0 })


});

// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let newMovie = movies({
        "Title": req.body.Title,
        "Description": req.body.Description,
        "Released": req.body.Released,
        "Director": req.body.Director,
        "Genre": req.body.Genre,
    });
    movies.create(newMovie, (err, list) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/movies')
        }
    });

});

// GET the Movies Details page in order to edit an existing Movies
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    movies.findById(id, (err, movieToEdit) => {
        if (err) {
            console.log(err);
        } else {
            res.render('movies/details', { title: 'Edit Movie', list: movieToEdit })
        }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;

    let updateMovie = movies({
        "_id": id,
        "Title": req.body.Title,
        "Description": req.body.Description,
        "Released": req.body.Released,
        "Director": req.body.Director,
        "Genre": req.body.Genre,
    })

    movies.updateOne({
        _id: id
    }, updateMovie, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/movies')
        }

    })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;

    movies.remove({
            _id: id
        },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/movies')
            }
        })
});


module.exports = router;