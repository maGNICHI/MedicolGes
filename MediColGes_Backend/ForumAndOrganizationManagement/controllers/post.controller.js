const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { promisify } = require("util");
const upload = require("../../multer");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

module.exports.readPost = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 }).exec();
    res.send(posts);
  } catch (error) {
    console.log("Error to get data : " + error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.createPost = async (req, res) => {
  // let fileName;

  // if (req.file !== null) {
  //   try {
  //     if (
  //       req.file.detectedMimeType != "image/jpg" &&
  //       req.file.detectedMimeType != "image/png" &&
  //       req.file.detectedMimeType != "image/jpeg"
  //     )
  //       throw Error("invalid file");

  //     if (req.file.size > 500000) throw Error("max size");
  //   } catch (err) {
  //     const errors = uploadErrors(err);
  //     return res.status(201).json({ errors });
  //   }
  //   fileName = req.body.posterId + Date.now() + ".jpg";

  //   await pipeline(
  //     req.file.stream,
  //     fs.createWriteStream(
  //       `${__dirname}/../client/public/uploads/posts/${fileName}`
  //     )
  //   );
  // }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.body.picture, //file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
// module.exports.createPost = async (req, res) => {
//   try {
//     // Check if file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Log the req.file object to inspect its contents
//     console.log("Uploaded file:", req.file);

//     // Upload image to Cloudinary
//     const uploader = async (path) => await cloudinary.uploads(path, "Images");
//     const newPath = await uploader(req.file.path);
//     fs.unlinkSync(req.file.path); // Remove the temporary file

//     // Create new post with Cloudinary URL
//     const newPost = new PostModel({
//       posterId: req.body.posterId,
//       message: req.body.message,
//       picture: newPath.url, // Store the Cloudinary URL
//       video: req.body.video,
//       likers: [],
//       comments: [],
//     });

//     // Save post to database
//     const post = await newPost.save();
//     res
//       .status(201)
//       .json({ success: { msg: "Post created successfully", post } });
//   } catch (err) {
//     console.error("Error creating post:", err);
//     res.status(400).json({ errors: [{ msg: err.message }] });
//   }
// };

module.exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { message, video } = req.body;

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { message, video },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deletePost = async (req, res) => {
  const postId = req.params.id; // Assuming the post ID is passed as a URL parameter

  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: "65da89a83a19c50a83054dac" } }, // Remplacez "65da89a83a19c50a83054dac" par l'ID de votre utilisateur
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: "65da89a83a19c50a83054dac" } }, // Remplacez "65da89a83a19c50a83054dac" par l'ID de votre utilisateur
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: "65da89a83a19c50a83054dac", // Static user ID
            commenterPseudo: "utilisateur_test", // Static username
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const post = await PostModel.findById(req.params.id);

    const theComment = post.comments.find((comment) =>
      comment._id.equals(req.body.commentId)
    );

    if (!theComment) return res.status(404).send("Comment not found");

    theComment.text = req.body.text;

    await post.save();

    res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: { _id: req.body.commentId },
        },
      },
      { new: true }
    );

    res.send(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.getAllComments = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const comments = post.comments;
    res.json(comments);
  } catch (err) {
    return res.status(400).send(err);
  }
};
