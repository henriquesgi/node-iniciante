import { IsDateString } from 'class-validator';

export class UpdateHistoricoDto {
  @IsDateString()
  dataDevolucao: Date;
}
