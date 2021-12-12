import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricoDto } from './create-historico.dto';

export class UpdateHistoricoDto extends PartialType(CreateHistoricoDto) {}
