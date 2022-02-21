import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength
} from "class-validator";

export class CreateClienteDto {
  @IsNumber()
  @IsPositive()
  @Max(1000)
  cnh: number;

  @IsString()
  @MaxLength(50)
  endereco: string;

  @IsString()
  @MaxLength(50)
  nome: string;
}
