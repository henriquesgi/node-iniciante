import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Carro {
  @PrimaryColumn()
  placa: string;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @Column()
  passageiros: number;

  @Column()
  alugado: boolean;
}
