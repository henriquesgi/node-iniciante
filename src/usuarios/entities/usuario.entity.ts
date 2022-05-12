import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  senha: string;
}
