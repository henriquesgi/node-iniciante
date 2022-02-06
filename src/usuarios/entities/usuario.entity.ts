import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryColumn()
  username: string

  @Column()
  nome: string

  @Column()
  password: string
}
