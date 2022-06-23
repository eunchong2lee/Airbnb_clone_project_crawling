const express = require("express")
const postRouter = express.Router()
// const cron = require("node-cron");

const {Posts} = require('../models/post')
const {crawler, crawlerdetails} = require('../crawl')

postRouter.post('/posts', async (req, res)=>{
    // const {result1, category} = await crawler();
    const result = await crawlerdetails();
    // if(!result ){
    //   return res.status(400).send({message:"실패"});
    // }
    // console.log(result1);
    // console.log(category);
    // console.log(result1.length);
    // for(let i = 0; i < result1.length; i++){
    //   const newData = result1[i];
    //   const checkpost = await Posts.findOne({postId: newData.postId})
    //   if(!checkpost){
    //     const post = new Posts({score: newData.score,title: newData.title, category, location: newData.location, url: newData.url, length: newData.length, date: newData.date, star: newData.star, price: newData.price,image : [],details :{},postId : newData.postId});
    //     await post.save();
    //   }}
    

    
    console.log(result);
    for( let j= 0; j<result.length; j++){
      const newResult = result[j]
      console.log(result.length);
      // console.log(newResult);
      const newPosts = await Posts.findOneAndUpdate({postId: Number(newResult.postId)},{score: newResult.score,image: newResult.image, details: {hosting: newResult.hosting, information: newResult.information, description: newResult.description,money: newResult.money}})
      console.log(newPosts);
    }

    const posts = await Posts.find({category: '호숫가'})
    return res.status(200).json({posts}); 

})

postRouter.get('/posts', async (req, res)=>{
  const posts = await Posts.find({category: '초소형주택'});
  return res.status(200).json({posts});
})

postRouter.delete('/posts',async (req, res)=>{
})

module.exports = {postRouter}