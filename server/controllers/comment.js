import asyncHandler from 'express-async-handler'
import { Post, Comment } from '../database/models';
import ErrorResponse from '../utils/errorResponse.js'


export const createComment = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const comment = await Comment.create({ title, body });

  return res.status(201).json({
    success: true,
    data: comment,
  });
});

export const getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByPk(req.params.id, {
    include: [ Post ],
  });

  if (!comment) return next(new ErrorResponse('Comment not found', 404));

  return res.status(200).json({
    success: true,
    data: comment,
  })
});

export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.findAll({
    include: [ Post ]
  });

  return res.status(200).json({
    success: true,
    data: comments,
  })
});

export const updateComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByPk(req.params.id, {
    include: [ Post ],
  })

  if (!comment) return next(new ErrorResponse('Comment not found', 404));

  await comment.update(req.body);

  await comment.reload();

  return res.status(200).json({
    success: true,
    data: comment,
  });
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByPk(req.params.id)

  if (!comment) return next(new ErrorResponse('Post not found', 404));

  await comment.destroy({ force: true });

  return res.status(200).json({
    success: true,
    data: {},
  });
});