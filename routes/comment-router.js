const express = require("express");
const router = express.Router();
const {postComment, deleteComment} = require("../controllers/comment-controller");

router.post("/post-comment", postComment);
router.post("/delete-comment", deleteComment);

module.exports = router;