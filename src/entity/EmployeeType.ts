import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class EmployeeType extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'title',
  })
  title: string;

  @OneToMany(() => User, user => user.type)
  users: User[];
}
