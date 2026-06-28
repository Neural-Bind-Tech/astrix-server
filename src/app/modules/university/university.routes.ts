import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UniversityController } from './university.controller';
import { UniversityValidation } from './university.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(UniversityValidation.listUniversitySchema),
  UniversityController.listUniversities
);
router.post(
  '/',
  validateRequest(UniversityValidation.createUniversitySchema),
  UniversityController.createUniversity
);
router.post(
  '/bulk',
  validateRequest(UniversityValidation.bulkCreateUniversitySchema),
  UniversityController.bulkCreateUniversities
);
router.put(
  '/bulk',
  validateRequest(UniversityValidation.bulkUpdateUniversitySchema),
  UniversityController.bulkUpdateUniversities
);
router.patch(
  '/update-many',
  validateRequest(UniversityValidation.updateManyUniversitySchema),
  UniversityController.updateManyUniversities
);
router.delete(
  '/',
  validateRequest(UniversityValidation.deleteManyUniversitySchema),
  UniversityController.deleteManyUniversities
);
router.get(
  '/:id',
  validateRequest(UniversityValidation.universityIdParamsSchema),
  UniversityController.getUniversityById
);
router.put(
  '/:id',
  validateRequest(UniversityValidation.universityIdParamsSchema),
  validateRequest(UniversityValidation.updateUniversitySchema),
  UniversityController.updateUniversityById
);
router.delete(
  '/:id',
  validateRequest(UniversityValidation.universityIdParamsSchema),
  UniversityController.deleteUniversityById
);
router.put(
  '/:id/restore',
  validateRequest(UniversityValidation.universityIdParamsSchema),
  UniversityController.restoreUniversityById
);

export const universityRoutes = router;
