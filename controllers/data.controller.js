const Comment = require('../models/comment.model.js')
const Img = require('../models/img.model.js')
const Product = require('../models/product.model.js')

const getData = ((req, res) => {
  const mapData = async () =>  {
    const [posts, photos, comments] = await Promise.all([
      Product.find({}),
      Img.find({}),
      Comment.find({}),
    ]);

     posts.map((p) => { 
      const avatars = photos.find((u) => u.id === p.userId); // userId in posts
      //Add Comments
      const commentsInPost = comments.find((u) => u.id === p.userId);
       return {
        ...p,
        commentsInPost,
        avatars,
      }
    });
  };
 const realData = async() =>{

 }
        (result) => res.status(200).json({ result })
     .catch(error => res.status(404).json({msg: error}))
 console.log(mapData())

});

module.exports = {
    getData
}
