import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderItem } from './OrderItem';
import { Supplier } from './Supplier';
import { User } from './User';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'date_created',
  })
  dateCreated: Date;

  @Column('varchar', {
    nullable: false,
    name: 'serial_number',
  })
  serialNumber: string;

  @Column('double', {
    nullable: true,
    name: 'total_amount',
  })
  totalAmount: number | null;

  @ManyToOne(type => User, user => user.orders, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: User | null;

  @ManyToOne(type => Supplier, supplier => supplier.orders, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier | null;

  @OneToMany(type => OrderItem, orderItem => orderItem.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orderItems: [OrderItem];
}
