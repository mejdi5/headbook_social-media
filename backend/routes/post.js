const router = require("express").Router();
const Post = require("../models/Post");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
    try {
    const posts = await Post.find();
        res.status(200).json(posts.sort((a,b) => b.createdAt > a.createdAt ? 1 : -1))
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user's posts
router.get("/user/:id", async (req, res) => {
  try {
    const userPosts = await Post.find({ userId: req.params.id });
    res.status(200).json(userPosts.sort((a,b) => b.createdAt > a.createdAt ? 1 : -1));
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET one Post
router.get("/:postId", async (req, res) => {
  try {
      const post = await Post.findOne({_id: req.params.postId});
      res.status(200).json(post);
  } catch (error) {
      res.status(500).json(error);
  }
});

//update a post
router.put("/:postId", async (req, res) => {
  try {
    const editedPost = await Post.findByIdAndUpdate(
      req.params.postId, 
      {$set: req.body}, 
      { new: true }
    )
    res.status(200).json({msg: "Post edited..", editedPost});
    } catch (err) {
    console.log(err.message)
    res.status(500).json(err);
  }
});


//DELETE post
router.delete("/:_id", async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({_id: req.params._id});
            res.status(200).json({msg:`the post has been deleted...`, deletedPost});
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;