const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;
//const { promisify } = require("util");
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
  const { posterId, message, picture, video, tags, project } = req.body;
  const formattedTags = Array.isArray(tags) ? tags.join(",") : tags;

  const newPost = new postModel({
    posterId,
    message,
    tags: formattedTags
      ? formattedTags.split(",").map((tag) => tag.trim())
      : [],
    video,
    likers: [],
    comments: [],
    project,
  });

  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const uploadedImages = [];

  try {
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const { path } = file;
        const newPath = await uploader(path);
        uploadedImages.push(newPath.url);
        fs.unlinkSync(path);
      }
      newPost.image = uploadedImages;
    }

    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

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

// Inside likePost Controller
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const userId = req.headers['user-id']; // Extract user ID from request headers

    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: userId }, // Use userId extracted from headers
      },
      { new: true }
    );

    // Send response
    res.status(200).json({ message: "Post liked successfully" });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Inside unlikePost Controller
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const userId = req.headers['user-id']; // Extract user ID from request headers

    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: userId }, // Use userId extracted from headers
      },
      { new: true }
    );

    // Send response
    res.status(200).json({ message: "Post unliked successfully" });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
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

// Fonction pour traiter la requête de l'utilisateur
module.exports.processUserRequest = async (req, res) => {
    const userInput = req.body.message; // Obtenez le texte de la requête de l'utilisateur

    try {
        const botResponse = await sendQueryToWit(userInput); // Envoyez la requête à Wit.ai
        res.json({ botResponse }); // Retourner la réponse de Wit.ai à l'utilisateur
    } catch (error) {
        console.error('Error processing user request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};