import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity('employee_type', { schema: 'fpis' })
export class EmployeeType {
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

  @OneToMany(type => User, user => user.type, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  users: User[];
}
