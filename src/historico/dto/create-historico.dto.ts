import {
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength
} from "class-validator";

export class CreateHistoricoDto {
  @IsNumber()
  @IsPositive()
  @Max(1000)
  cnh: string;

  @IsString()
  @MaxLength(7)
  placa: string;

  @IsDateString()
  dataDevolucaoEfetuada?: Date;

  @IsDateString()
  dataDevolucaoPrevista: Date;

  @IsDateString()
  dataLocacao: Date;

  @IsNumber()
  @IsPositive()
  valorAluguel: number;
}
