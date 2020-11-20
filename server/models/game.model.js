const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    uniqueValidator = require('mongoose-unique-validator');

const MessageSchema = new mongoose.Schema({
        messages: {
            type: String,
            minlength:[3, "Message must be at least 3 characters."]
        }
    }, {timestamps: true})
    

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:[true,"Please enter a first name."],
        minlength:[3,"First name must be at least 3 characters."],
    },    
    lastName:{
        type: String,
        required:[true,"Please enter a last name."],
        minlength:[3,"Last Name must be at least 3 characters."],
    },
    email:{
        type:String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
    },
    password:{
        type: String,
        required:[true,"A password is required."],
        minlength:[6,"Password must be at least 6 characters."],
    },

    messages : [MessageSchema]

}, {timestamps:true})


const GameSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"A Group name is required"],
    },
    location:{
        type: String,
        required:[true,"A location is required."],
        minlength:[3,"A Location is required."],
    },

    player1: {
    user: UserSchema,
    scores: [Number]
    },

    player2:  {
    user: UserSchema,
    scores: [Number]
    },

    player3:  {
        user: UserSchema,
        scores: [Number]
    },

    player4:  {
        user: UserSchema,
        scores: [Number]
    },

    player5:  {
        user: UserSchema,
        scores: [Number]
    },

    player6:  {
        user: UserSchema,
        scores: [Number]
    },

    player7:  {
        user: UserSchema,
        scores: [Number]
    },

    player8:  {
        user: UserSchema,
        scores: [Number]
    },

    messages : [MessageSchema]


},{timestamps:true})


UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate',function(next){
    if (this.password !== this.confirmPassword){
        this.invalidate('confirmPassword','Password must match confirm password')
    }
    next();
})

UserSchema.pre('save',function(next){
    bcrypt.hash(this.password,10)
        .then(hash => {
            this.password = hash;
            next();
        })
})

module.exports.User = mongoose.model("User", UserSchema);
module.exports.Game = mongoose.model("Game", GameSchema);
module.exports.Message = mongoose.model("Message", MessageSchema);