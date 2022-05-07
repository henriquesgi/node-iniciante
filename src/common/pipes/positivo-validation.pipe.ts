
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

/**
 * Pipe para validar a utilização correta da paginação.
 * 
 * Apenas valores entre 0 e 1000 são permitidos.
 */
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
