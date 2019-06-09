import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Supplier } from './Supplier';
import { User } from './User';

@Entity('order', { schema: 'fpis' })
@Index('order_SupplierID_uindex', ['supplier'], { unique: true })
@Index('order_user_id_fk', ['employee'])
export class Order {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  id: number;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'DateCreated',
  })
  DateCreated: Date;

  @Column('int', {
    nullable: false,
    name: 'SerialNumber',
  })
  serialNumber: number;

  @Column('double', {
    nullable: true,
    name: 'TotalAmount',
  })
  totalAmount: number | null;

  @ManyToOne(type => User, user => user.orders, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'EmployeeID' })
  employee: User | null;

  @OneToOne(type => Supplier, supplier => supplier.order, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'SupplierID' })
  supplier: Supplier | null;
}
