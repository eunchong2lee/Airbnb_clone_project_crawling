const express = require("express")
const postRouter = express.Router()

const {Posts} = require('../models/post')
const {crawler, crawlerdetails} = require('../crawl')

postRouter.post('/posts', async (req, res)=>{
    const {data, category} = await crawler();
    const result = await crawlerdetails();
    console.log(data);
    for(let i = 1; i < data.length; i++){
      const newData = data[i];
      const post = new Posts({title: newData.title, category, location: newData.location, url: newData.url, length: newData.length, date: newData.date, star: newData.star, price: newData.price,image : [],details :{}});
      await post.save();
    }
    console.log(result);
    for( let j= 0; j<result.length; j++){
      const newResult = result[j]
      console.log(result.length);
      // console.log(newResult);
      const newPosts = await Posts.findOneAndUpdate({url: newResult.url},{image: newResult.image, details: {hosting: newResult.hosting, information: newResult.information, description: newResult.description,money: newResult.money}})
      console.log(newPosts);
    }

    const posts = await Posts.find()
    return res.status(200).json({posts});

})

postRouter.get('/posts', async (req, res)=>{
  const posts = await Posts.find();
  return res.status(200).json({posts});
})

module.exports = {postRouter}