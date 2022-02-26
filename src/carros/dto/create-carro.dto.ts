import {
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  MaxLength
} from "class-validator";

export class CreateCarroDto {
  @IsString()
  @Length(7)
  placa: string;

  @IsNumber()
  @IsPositive()
  @Max((new Date()).getUTCFullYear())
  ano: number;

  @IsString()
  @MaxLength(50)
  modelo: string;

  @IsNumber()
  @IsPositive()
  @Max(5)
  passageiros: number;
}
