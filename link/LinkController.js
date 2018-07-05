var jwt = require('jsonwebtoken');
var config = require('../config');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Link = require('../link/Link');

router.post('/', function(req, res) {
    Link.create({
            url: req.body.url,
            start: req.body.start,
            expiration: req.body.expiration
        },
        function(err, link) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(link);
        });
});

router.get('/', function(req, res) {
    Link.find({}, function(err, links) {
        if (err) return res.status(500).send('Error on the server.');
        if (!links) return res.status(404).send('No links found.');
        res.status(200).send(links);
    });
});

module.exports = router;

