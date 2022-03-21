import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateCarroDto {
  @IsString()
  @MaxLength(7)
  @MinLength(7)
  @ApiProperty({
    description: 'Identificação única do carro.',
    type: String
  })
  placa: string;

  @IsNumber()
  @IsPositive()
  @Max((new Date()).getUTCFullYear())
  @ApiProperty({
    description: 'Ano de fabricação do carro.',
    type: Number
  })
  ano: number;

  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'Modelo do carro.',
    type: String
  })
  modelo: string;

  @IsNumber()
  @IsPositive()
  @Max(5)
  @ApiProperty({
    description: 'Quantidade de passageiros do carro.',
    type: Number
  })
  passageiros: number;
}
