import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto {
  @IsString()
  endereco: string;
}
