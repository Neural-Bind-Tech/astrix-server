import { type NextFunction, type Request, type Response } from 'express';
import type { ZodType } from 'zod';

const validateRequest =
  (schema: ZodType) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })) as any;

      if (parsed.body !== undefined) {
        req.body = parsed.body;
      }
      
      if (parsed.query) {
        Object.assign(req.query, parsed.query);
      }
      if (parsed.params) {
        Object.assign(req.params, parsed.params);
      }
      if (parsed.cookies && req.cookies) {
        Object.assign(req.cookies, parsed.cookies);
      }

      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
