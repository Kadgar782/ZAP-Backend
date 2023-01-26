const Comment = require("../models/comment.model.js");
const Product = require("../models/product.model.js");

const getData = async (req, res) => {
  try {
    const [posts,  comments] = await Promise.all([
      Product.find({}).lean(),
      Comment.find({}).lean(),
    ]);

    const data = posts.map((p) => {
      //Add Comments
      const arrayForComments = comments.find((u) => u.postId === p._id.toString());
      if (arrayForComments === 0 ||arrayForComments === undefined || arrayForComments === null )
      {
      const commentsInPost = [];
      return {
        ...p,
        commentsInPost,
      };
      }
      else {
        const commentsInPost = [arrayForComments];
      return {
        ...p,
        commentsInPost,
      };
      }
      
    });
console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

module.exports = {
  getData,
};
