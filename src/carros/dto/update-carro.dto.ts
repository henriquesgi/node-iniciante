import { PartialType } from '@nestjs/mapped-types';
import { CreateCarroDto } from './create-carro.dto';

export class UpdateCarroDto extends PartialType(CreateCarroDto) {}
