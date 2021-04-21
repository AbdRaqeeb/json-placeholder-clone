import express from 'express';
import { createComment, deleteComment, getComment, getComments, updateComment } from '../controllers/comment.js'

const router = express.Router({mergeParams: true});

router
  .route('/:id')
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment);

router
  .route('/')
  .post(createComment)
  .get(getComments);

export default router;