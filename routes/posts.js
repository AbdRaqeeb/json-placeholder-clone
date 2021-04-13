import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.js';

const router = express.Router({mergeParams: true});

router
  .route('/:id')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

router
  .route('/')
  .post(createPost)
  .get(getPosts);

export default router;