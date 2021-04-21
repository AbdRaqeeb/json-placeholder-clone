import asyncHandler from 'express-async-handler'
import { Post, Comment } from '../database/models';
import ErrorResponse from '../utils/errorResponse.js'


export const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const post = await Post.create({ title, body });

  return res.status(201).json({
    success: true,
    data: post,
  });
});

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id, {
    include: [ Comment ],
  });

  if (!post) return next(new ErrorResponse('Post not found', 404));

  return res.status(200).json({
    success: true,
    data: post,
  })
});

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll();

  return res.status(200).json({
    success: true,
    data: posts,
  })
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id, {
    include: [Comment],
  })

  if (!post) return next(new ErrorResponse('Post not found', 404));

  await post.update(req.body);

  await post.reload();

  return res.status(200).json({
    success: true,
    data: post,
  });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) return next(new ErrorResponse('Post not found', 404));

  await post.destroy({ force: true });

  return res.status(200).json({
    success: true,
    data: {},
  });
});