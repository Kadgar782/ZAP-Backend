const Comment = require('../models/comment.model.js')
const Img = require('../models/img.model.js')
const Product = require('../models/product.model.js')

const getData = async (req, res) => {
  const mapData = async () => {
    const [posts, photos, comments] = await Promise.all([
      Product.find({}).lean(),
      Img.find({}).lean(),
      Comment.find({}).lean(),
    ]);
    console.log(photos);
    console.log(posts);
    console.log(comments);

    const mapPosts = () =>
      posts.map((p) => {
        const avatars = photos.find((u) => u.id === p.userId); // userId in posts
        //Add Comments
        const commentsInPost = comments.find((u) => u.id === p.userId);
        // console.log(posts);
        // console.log(avatars);
        // console.log(commentsInPost);
        return {
          ...p,
          commentsInPost,
          avatars,
        };
      });
    return mapPosts();
  };
  mapData();

  (async function () {
    console.log(await mapData());
  })();

  (result) =>res.status(200).json({ result })
    .catch((error) => res.status(404).json({ msg: error }));
};

module.exports = {
    getData
}
