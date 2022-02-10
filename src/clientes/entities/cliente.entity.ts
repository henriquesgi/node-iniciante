import { Historico } from 'src/historico/entities/historico.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Cliente {
  @OneToMany((type) => Historico, (historico) => historico.cnh)
  @PrimaryColumn()
  cnh: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;
}
