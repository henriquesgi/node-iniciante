import { Historico } from 'src/historico/entities/historico.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Carro {
  @OneToMany((type) => Historico, (historico) => historico.placa)
  @PrimaryColumn()
  placa: string;

  @Column({ default: false })
  alugado: boolean;

  @Column()
  ano: number;

  @Column({ default: false })
  excluido: boolean;

  @Column()
  modelo: string;

  @Column()
  passageiros: number;
}
