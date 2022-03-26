import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({
    description: 'Identificação única do cliente.',
    type: Number
  })
  cnh: number;

  @IsString()
  @Length(7)
  @ApiProperty({
    description: 'Identificação única do carro.',
    type: String
  })
  placa: string;

  @IsDateString()
  @ApiProperty({
    description: 'Data de devolução prevista para o cliente entregar o carro.',
    type: Date
  })
  dataDevolucaoPrevista: Date;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Valor do aluguel de um carro a ser cobrado do cliente.',
    type: Number
  })
  valorAluguel: number;
}
