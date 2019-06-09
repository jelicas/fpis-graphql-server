import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity('employee_type', { schema: 'fpis' })
export class EmployeeType extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'Title',
  })
  title: string;

  @OneToMany(type => User, user => user.type, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  users: User[];
}
