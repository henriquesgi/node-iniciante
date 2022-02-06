import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryColumn()
  cnh: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;
}
