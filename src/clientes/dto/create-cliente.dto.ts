import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateClienteDto {
  @IsNumber()
  @IsPositive()
  @Max(1000)
  @ApiProperty({
    description: 'Identificação única do cliente.',
    type: Number,
  })
  cnh: number;

  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'Endereço do cliente.',
    type: String,
  })
  endereco: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'Nome do cliente.',
    type: String,
  })
  nome: string;
}
