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

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 128,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'surname',
  })
  surname: string;

  @Column('varchar', {
    nullable: false,
    name: 'username',
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    name: 'password',
  })
  password: string;

  @Column('varchar', {
    nullable: false,
    name: 'biography',
  })
  biography: string;

  @Column('varchar', {
    nullable: false,
    name: 'address',
  })
  address: string;

  @Column('varchar', {
    nullable: false,
    name: 'telephone',
  })
  telephone: string;

  @Column('varchar', {
    nullable: false,
    name: 'pid',
  })
  pid: string;

  @ManyToOne(type => EmployeeType, employeeType => employeeType.users, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'type_id' })
  type: EmployeeType | null;

  @OneToMany(type => Order, order => order.employee, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  orders: Order[];

  @OneToMany(type => Requisition, requisition => requisition.employee, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  requisitions: Requisition[];
}
