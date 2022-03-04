import { Carro } from 'src/carros/entities/carro.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

import {
  Column,
  Entity, ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Historico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Cliente, (cliente) => cliente.cnh)
  @Column()
  cnh: string;

  @ManyToOne((type) => Carro, (carro) => carro.placa)
  @Column()
  placa: string;

  @Column({ type: 'timestamptz', default: null })
  dataDevolucaoEfetuada: Date;

  @Column({ type: 'timestamptz' })
  dataDevolucaoPrevista: Date;

  @Column({ type: 'timestamptz' })
  dataLocacao: Date;

  @Column()
  valorAluguel: number;
}
