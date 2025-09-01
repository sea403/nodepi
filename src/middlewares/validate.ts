import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';

export const validate =
  (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (e) {
      const ze = e as ZodError;

      // build field-level errors
      const fieldErrors: Record<string, string[]> = {};
      ze.errors.forEach((err) => {
        const path = err.path.join('.') || 'root';
        if (!fieldErrors[path]) fieldErrors[path] = [];
        fieldErrors[path].push(err.message);
      });

      next(ApiError.badRequest('Validation failed', { fieldErrors }));
    }
  };
