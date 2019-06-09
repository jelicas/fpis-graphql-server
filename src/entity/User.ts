import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EmployeeType } from './EmployeeType';
import { Order } from './Order';
import { Requisition } from './Requisition';

@Entity('user', { schema: 'fpis' })
@Index('FK_0c1897db79478228a0711c73bcb', ['type'])
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'Name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'Surname',
  })
  surname: string;

  @Column('varchar', {
    nullable: false,
    name: 'Username',
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    name: 'Email',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    name: 'Password',
  })
  password: string;

  @Column('varchar', {
    nullable: false,
    name: 'Biography',
  })
  biography: string;

  @Column('varchar', {
    nullable: false,
    name: 'Address',
  })
  address: string;

  @Column('varchar', {
    nullable: false,
    name: 'Telephone',
  })
  telephone: string;

  @ManyToOne(type => EmployeeType, employeeType => employeeType.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'TypeID' })
  type: EmployeeType | null;

  @Column('varchar', {
    nullable: false,
    name: 'PID',
  })
  PID: string;

  @OneToMany(type => Order, order => order.employee, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  orders: Order[];

  @OneToMany(type => Requisition, requisition => requisition.employee, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  requisitions: Requisition[];
}
