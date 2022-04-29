
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PositivoValidationPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (isNaN(value)) {
      throw new BadRequestException()
    }

    if (+value < 0 || +value > 1000) {
      return 0
    }

    return value;
  }
}
