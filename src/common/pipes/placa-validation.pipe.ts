import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * Pipe para validação de APIs que recebem placa (PK da tabela carro).
 */
@Injectable()
export class PlacaValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || value.length !== 7) {
      throw new BadRequestException();
    }

    return value;
  }
}
