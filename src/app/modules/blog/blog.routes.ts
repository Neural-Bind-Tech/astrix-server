import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(BlogValidation.listBlogSchema),
  BlogController.listBlogs
);
router.post(
  '/',
  validateRequest(BlogValidation.createBlogSchema),
  BlogController.createBlog
);
router.post(
  '/bulk',
  validateRequest(BlogValidation.bulkCreateBlogSchema),
  BlogController.bulkCreateBlogs
);
router.put(
  '/bulk',
  validateRequest(BlogValidation.bulkUpdateBlogSchema),
  BlogController.bulkUpdateBlogs
);
router.patch(
  '/update-many',
  validateRequest(BlogValidation.updateManyBlogSchema),
  BlogController.updateManyBlogs
);
router.delete(
  '/',
  validateRequest(BlogValidation.deleteManyBlogSchema),
  BlogController.deleteManyBlogs
);
router.get(
  '/:id',
  validateRequest(BlogValidation.blogIdParamsSchema),
  BlogController.getBlogById
);
router.put(
  '/:id',
  validateRequest(BlogValidation.blogIdParamsSchema),
  validateRequest(BlogValidation.updateBlogSchema),
  BlogController.updateBlogById
);
router.delete(
  '/:id',
  validateRequest(BlogValidation.blogIdParamsSchema),
  BlogController.deleteBlogById
);
router.put(
  '/:id/restore',
  validateRequest(BlogValidation.blogIdParamsSchema),
  BlogController.restoreBlogById
);

export const blogRoutes = router;
