import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TestimonialController } from './testimonial.controller';
import { TestimonialValidation } from './testimonial.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(TestimonialValidation.listTestimonialSchema),
  TestimonialController.listTestimonials
);
router.post(
  '/',
  validateRequest(TestimonialValidation.createTestimonialSchema),
  TestimonialController.createTestimonial
);
router.post(
  '/bulk',
  validateRequest(TestimonialValidation.bulkCreateTestimonialSchema),
  TestimonialController.bulkCreateTestimonials
);
router.put(
  '/bulk',
  validateRequest(TestimonialValidation.bulkUpdateTestimonialSchema),
  TestimonialController.bulkUpdateTestimonials
);
router.patch(
  '/update-many',
  validateRequest(TestimonialValidation.updateManyTestimonialSchema),
  TestimonialController.updateManyTestimonials
);
router.delete(
  '/',
  validateRequest(TestimonialValidation.deleteManyTestimonialSchema),
  TestimonialController.deleteManyTestimonials
);
router.get(
  '/:id',
  validateRequest(TestimonialValidation.testimonialIdParamsSchema),
  TestimonialController.getTestimonialById
);
router.put(
  '/:id',
  validateRequest(TestimonialValidation.testimonialIdParamsSchema),
  validateRequest(TestimonialValidation.updateTestimonialSchema),
  TestimonialController.updateTestimonialById
);
router.delete(
  '/:id',
  validateRequest(TestimonialValidation.testimonialIdParamsSchema),
  TestimonialController.deleteTestimonialById
);
router.put(
  '/:id/restore',
  validateRequest(TestimonialValidation.testimonialIdParamsSchema),
  TestimonialController.restoreTestimonialById
);

export const testimonialRoutes = router;
