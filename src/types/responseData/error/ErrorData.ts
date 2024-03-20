import { z } from 'zod';

export const ErrorDataSchema = z.object({
  message: z.string(),
});

export type ErrorData = z.infer<typeof ErrorDataSchema>;
