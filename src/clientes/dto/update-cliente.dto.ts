import { IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsString()
  endereco: string;
}
