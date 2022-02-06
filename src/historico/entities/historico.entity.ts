import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Historico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnh: string;

  @Column()
  placa: string;

  @Column()
  dataDevolucao: Date;

  @Column()
  dataDevolucaoPrevista: Date;

  @Column()
  dataLocacao: Date;

  @Column()
  valorAluguel: number;
}
