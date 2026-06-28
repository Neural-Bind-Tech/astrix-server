import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { VisaAppointmentController } from './visaAppointment.controller';
import { VisaAppointmentValidation } from './visaAppointment.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(VisaAppointmentValidation.listVisaAppointmentSchema),
  VisaAppointmentController.listVisaAppointments
);
router.post(
  '/',
  validateRequest(VisaAppointmentValidation.createVisaAppointmentSchema),
  VisaAppointmentController.createVisaAppointment
);
router.post(
  '/bulk',
  validateRequest(VisaAppointmentValidation.bulkCreateVisaAppointmentSchema),
  VisaAppointmentController.bulkCreateVisaAppointments
);
router.put(
  '/bulk',
  validateRequest(VisaAppointmentValidation.bulkUpdateVisaAppointmentSchema),
  VisaAppointmentController.bulkUpdateVisaAppointments
);
router.patch(
  '/update-many',
  validateRequest(VisaAppointmentValidation.updateManyVisaAppointmentSchema),
  VisaAppointmentController.updateManyVisaAppointments
);
router.delete(
  '/',
  validateRequest(VisaAppointmentValidation.deleteManyVisaAppointmentSchema),
  VisaAppointmentController.deleteManyVisaAppointments
);
router.get(
  '/:id',
  validateRequest(VisaAppointmentValidation.visaAppointmentIdParamsSchema),
  VisaAppointmentController.getVisaAppointmentById
);
router.put(
  '/:id',
  validateRequest(VisaAppointmentValidation.visaAppointmentIdParamsSchema),
  validateRequest(VisaAppointmentValidation.updateVisaAppointmentSchema),
  VisaAppointmentController.updateVisaAppointmentById
);
router.delete(
  '/:id',
  validateRequest(VisaAppointmentValidation.visaAppointmentIdParamsSchema),
  VisaAppointmentController.deleteVisaAppointmentById
);
router.put(
  '/:id/restore',
  validateRequest(VisaAppointmentValidation.visaAppointmentIdParamsSchema),
  VisaAppointmentController.restoreVisaAppointmentById
);

export const visaAppointmentRoutes = router;
