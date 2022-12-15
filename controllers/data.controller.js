const Comment = require("../models/comment.model.js");
const Img = require("../models/img.model.js");
const Product = require("../models/product.model.js");

const getData = async (req, res) => {
  try {
    const [posts, photos, comments] = await Promise.all([
      Product.find({}).lean(),
      Img.find({}).lean(),
      Comment.find({}).lean(),
    ]);

    const data = posts.map((p) => {
      const avatars = photos.find((u) => u.id === p.id);
      //Add Comments
      const commentsInPost = comments.find((u) => u.id === p.id);
      return {
        ...p,
        commentsInPost,
        avatars,
      };
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

module.exports = {
  getData,
};
