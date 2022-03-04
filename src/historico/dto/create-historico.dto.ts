import {
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max
} from "class-validator";

export class CreateHistoricoDto {
  @IsNumber()
  @IsPositive()
  @Max(1000)
  cnh: string;

  @IsString()
  @Length(7)
  placa: string;

  @IsDateString()
  dataDevolucaoPrevista: Date;

  @IsNumber()
  @IsPositive()
  valorAluguel: number;
}
