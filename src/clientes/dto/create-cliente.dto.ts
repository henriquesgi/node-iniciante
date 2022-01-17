import {
  IsNumber,
  IsPositive,
  IsString,
  Max
} from "class-validator";

export class CreateClienteDto {
  @IsNumber()
  @IsPositive()
  @Max(1000)
  cnh: number;

  @IsString()
  nome: string;

  @IsString()
  endereco: string;
}
