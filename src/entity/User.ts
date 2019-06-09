import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EmployeeType } from './EmployeeType';
import { Order } from './Order';
import { Requisition } from './Requisition';

@Entity('user', { schema: 'fpis' })
// @Index('User_employee_type_type_fk', ['type'])
export class User extends BaseEntity {
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

  @Column('varchar', {
    nullable: false,
    name: 'PID',
  })
  pid: string;

  //done
  @ManyToOne(type => EmployeeType, employeeType => employeeType.users, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TypeID' })
  type: EmployeeType | null;

  //done
  @OneToMany(type => Order, order => order.employee, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  orders: Order[];

  //done
  @OneToMany(type => Requisition, requisition => requisition.employee, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  requisitions: Requisition[];
}
