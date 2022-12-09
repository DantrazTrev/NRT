import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  alias: string;

  @Column({
    type: 'nvarchar',
    length: 256,
    nullable: false,
  })
  password: string;
}
