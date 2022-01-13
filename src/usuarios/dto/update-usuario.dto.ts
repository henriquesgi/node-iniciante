import { IsString } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  endereco: string;
}
