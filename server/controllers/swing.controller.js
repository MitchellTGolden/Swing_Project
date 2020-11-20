const { Game } = require('../models/game.model');
const { User } = require('../models/game.model');
const { Message } = require('../models/game.model');

module.exports = {
    userIndex:(req,res) => {
        User.find()
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    gameIndex:(req,res) => {
        Game.find()
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    userShow: (req,res) => {
        User.findOne({_id:req.params.id})
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    gameShow: (req,res) => {
        Game.findOne({_id:req.params.id})
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    userCreate:(req,res) => {
        User.create(req.body)
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    gameCreate:(req,res) => {    
        console.log(req.body)
        Game.create(req.body)
        .then(data => res.json({results:data}))
        .catch(err => console.log(err))
    },
    gameUpdate:(req,res) => {
        Game.findOneAndUpdate({_id: req.params.id}, req.body)  
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    userUpdate:(req,res) => {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {useFindAndModify:true, runValidators:true})  
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    userDestroy:(req,res) => {
        User.deleteOne({_id:req.params.id})
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    gameDestroy:(req,res) => {
        Game.deleteOne({_id:req.params.id})
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },
    addPlayerToGame:(req,res) => {
        User.findOne({_id: req.params.userId})
            .then(data => {
                Game.findOneAndUpdate({_id: req.params.gameId}, {[req.params.player] :{user:data}})
                    .then(data => res.json({results:data}))
            })
    },
    groupMessage:(req, res) => {
        Message.create(req.body)
            .then(newMessage => {
                Game.findByIdAndUpdate({_id: req.params.id}, {$push:{messages:newMessage}})
            })
            .catch(err => res.json(err))
    },
    directMessage:(req, res) => {
        console.log(req.body)
        Message.create(req.body)
            .then(newMessage => {
                console.log(newMessage)
                User.findByIdAndUpdate({_id: req.params.id}, {$push:{"messages":newMessage}})
                .then(data => res.json({results:data}))
            })
            .catch(err => res.json(err))
    },
    messageIndex:(req,res) => {
        Message.find()
            .then(data => res.json({results:data}))
            .catch(err => res.json(err.errors))
    },

}