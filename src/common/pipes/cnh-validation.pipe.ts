
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class CnhValidationPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {

    if (isNaN(value) || value < 0 || value > 1000) {
      throw new BadRequestException()
    }

    return value;
  }
}
