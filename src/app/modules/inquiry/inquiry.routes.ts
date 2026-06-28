import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { InquiryController } from './inquiry.controller';
import { InquiryValidation } from './inquiry.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(InquiryValidation.listInquirySchema),
  InquiryController.listInquiries
);
router.post(
  '/',
  validateRequest(InquiryValidation.createInquirySchema),
  InquiryController.createInquiry
);
router.post(
  '/bulk',
  validateRequest(InquiryValidation.bulkCreateInquirySchema),
  InquiryController.bulkCreateInquiries
);
router.put(
  '/bulk',
  validateRequest(InquiryValidation.bulkUpdateInquirySchema),
  InquiryController.bulkUpdateInquiries
);
router.patch(
  '/update-many',
  validateRequest(InquiryValidation.updateManyInquirySchema),
  InquiryController.updateManyInquiries
);
router.delete(
  '/',
  validateRequest(InquiryValidation.deleteManyInquirySchema),
  InquiryController.deleteManyInquiries
);
router.get(
  '/:id',
  validateRequest(InquiryValidation.inquiryIdParamsSchema),
  InquiryController.getInquiryById
);
router.put(
  '/:id',
  validateRequest(InquiryValidation.inquiryIdParamsSchema),
  validateRequest(InquiryValidation.updateInquirySchema),
  InquiryController.updateInquiryById
);
router.delete(
  '/:id',
  validateRequest(InquiryValidation.inquiryIdParamsSchema),
  InquiryController.deleteInquiryById
);
router.put(
  '/:id/restore',
  validateRequest(InquiryValidation.inquiryIdParamsSchema),
  InquiryController.restoreInquiryById
);

export const inquiryRoutes = router;
