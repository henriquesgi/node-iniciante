import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Historico {
  @PrimaryColumn()
  id: number;

  @Column()
  cnh: number;

  @Column()
  placa: string;

  @Column({ name: 'datadevolucaoefetuada' })
  dataDevolucaoEfetuada: Date;

  @Column({ name: 'datadevolucaoprevista' })
  dataDevolucaoPrevista: Date;

  @Column({ name: 'datalocacao' })
  dataLocacao: Date;

  @Column({
    name: 'valoraluguel',
    transformer: {
      from: (value: string): number => Number(value),
      to: (value: number): number => value
    }
  })
  valorAluguel: number;
}
