const router = require('express').Router();
const LinksModel = require('../database/schem/links');

//get all links
router.get('/', (req, res) => {

    LinksModel.find({isActive: true})
        .then(data => {
            return res.status(200).send(data).end();
        })
        .catch(err => {
            return res.status(520).send([]).end();
        });
});

//update item
router.put('/', (req,res) =>{
    let data = req.body.data;
    //console.log(data);
    LinksModel.update({_id: data._id} ,{ $set: data })
        .then(()=> res.status(200).end())
        .catch(err => res.status(500).send(err.message).end());

});

//set link as inactive
router.delete('/', (req,res) =>{
    LinksModel.update({ _id: req.body.id }, { $set: { isActive: false }})
        .then(res.status(200).end())
        .catch(err => {
            console.log(err.message);
            res.status(204).end();
        })
});

//create new link
router.post('/',(req,res) => {
    console.log(req.body.data);
    const newLink = new LinksModel(req.body.data);
    newLink.save().then((data)=>{
        res.status(200).send(data).end()
    }).catch(err =>
        res.status(500).end()
    )
});

module.exports = router;