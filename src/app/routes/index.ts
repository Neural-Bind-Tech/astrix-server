import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.route';
import { applicationRoutes } from '../modules/application/application.routes';
import { blogRoutes } from '../modules/blog/blog.routes';
import { eventRoutes } from '../modules/event/event.routes';
import { eventRegistrationRoutes } from '../modules/eventregistration/eventregistration.routes';
import { inquiryRoutes } from '../modules/inquiry/inquiry.routes';
import { testimonialRoutes } from '../modules/testimonial/testimonial.routes';
import { universityRoutes } from '../modules/university/university.routes';
import { visaAppointmentRoutes } from '../modules/visaAppointment/visaAppointment.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/application',
    route: applicationRoutes,
  },
  {
    path: '/blog',
    route: blogRoutes,
  },
  {
    path: '/event',
    route: eventRoutes,
  },
  {
    path: '/eventregistration',
    route: eventRegistrationRoutes,
  },
  {
    path: '/inquiry',
    route: inquiryRoutes,
  },
  {
    path: '/testimonial',
    route: testimonialRoutes,
  },
  {
    path: '/university',
    route: universityRoutes,
  },
  {
    path: '/visaappointment',
    route: visaAppointmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;