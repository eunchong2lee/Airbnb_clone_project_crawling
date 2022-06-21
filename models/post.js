const mongoose = require("mongoose")
const autoIncrement = require("mongoose-sequence")(mongoose);

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        unique: true,
    },
    title: {
        type: String
    },
    location: {
        type: String,
    },
    length :{
        type: String,
    },
    date : {
        type: String,
    },
    image :{
      type: [String],
    },
    star: {
      type: String,
    },
    price : {
        type: String,
    },
    category:{
        type: String,
    },
    url : {
        type: String,
    },
    details :{
        hosting: {type: String},
        information: {type: String},
        money: {type: String},
        description: {type: String},
    }
},
{
        timestamps: true
});

const Posts = mongoose.model('post', postSchema);
module.exports ={Posts, postSchema};