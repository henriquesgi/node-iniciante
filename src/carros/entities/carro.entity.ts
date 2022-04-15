import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Carro {
  @PrimaryColumn()
  placa: string;

  @Column()
  alugado: boolean;

  @Column()
  ano: number;

  @Column()
  excluido: boolean;

  @Column()
  modelo: string;

  @Column()
  passageiros: number;
}
