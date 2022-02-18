import { IsBoolean } from "class-validator";

export class UpdateCarroDto {
  @IsBoolean()
  alugado?: boolean;

  @IsBoolean()
  excluido?: boolean;
}
