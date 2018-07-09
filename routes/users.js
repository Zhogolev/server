const router = require('express').Router();
const UserModel = require('../database/schem/user');

//get all users
router.get('/', (req, res) => {

    UserModel.find()
        .then(data => {
            return res.status(200).send(data).end();
        })
        .catch(err => {
            return res.status(520).send([]).end();
        });
});

//update user
router.put('/', (req,res) =>{
    let data = req.body.data;
    //console.log(data);
    LinksModel.update({_id: data._id} ,{ $set: data })
        .then(()=> res.status(200).end())
        .catch(err => res.status(500).send(err.message).end());

});

//set user as inactive
router.delete('/', (req,res) =>{

    UserModel.update({ _id: req.body.id }, { $set: { isActive: req.body.isActive }})
        .then(res.status(200).end())
        .catch(err => {
            console.log(err.message);
            res.status(204).end();
        })
});

//create new users
router.post('/',(req,res) => {
    console.log(req.body.data);
    const newLink = new UserModel(req.body.data);
    newLink.save().then((data)=>{
        res.status(200).send(data).end()
    }).catch(err =>
        res.status(500).end()
    )
});

module.exports = router;