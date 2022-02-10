import { Historico } from 'src/historico/entities/historico.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Carro {
  @OneToMany((type) => Historico, (historico) => historico.placa)
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
