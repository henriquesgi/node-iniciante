
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PlacaValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {

    if (typeof value !== 'string' || value.length !== 7) {
      throw new BadRequestException('Requisição inválida')
    }

    return value;
  }
}
