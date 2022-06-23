const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require("mongoose");

const {postRouter} = require('./routes/postsroutes')

mongoose.connect("mongodb+srv://lojy:drhKeiP2Nn4Nd3ad@cluster0.ojxiz.mongodb.net/Airbnb?retryWrites=true&w=majority", { ignoreUndefined: true });
// mongoose.connect("mongodb://localhost:27017/Airbnb_test", { ignoreUndefined: true });

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/api',[postRouter]);

app.get('/', function (req, res) {
  res.send('연결완료');
})

app.listen(3000, () => {
  console.log('서버가 요청을 받을 준비가 됐어요');
});