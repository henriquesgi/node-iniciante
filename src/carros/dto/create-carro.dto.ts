import {
  IsBoolean,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength
} from "class-validator";

export class CreateCarroDto {
  @IsString()
  @MaxLength(7)
  placa: string;

  @IsString()
  @MaxLength(50)
  modelo: string;

  @IsNumber()
  @IsPositive()
  @Max((new Date()).getUTCFullYear())
  ano: number;

  @IsNumber()
  @IsPositive()
  @Max(5)
  passageiros: number;

  @IsBoolean()
  alugado: boolean;
}
