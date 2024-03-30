const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../../multer");

router.get("/", postController.readPost);
router.post("/",
  upload.array("image"),postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
// comments
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);
router.get("/ShowComments/:id", postController.getAllComments);
router.post("/chatbot", postController.processUserRequest);
module.exports = router;
