import { Injectable, PipeTransform } from '@nestjs/common';
import { z, ZodSchema } from 'zod';

@Injectable()
export class ZodPipe<T extends ZodSchema<unknown>> implements PipeTransform {
  constructor(private readonly schema: T) {}

  transform(value: unknown): z.infer<T> {
    return this.schema.parse(value);
  }
}
