import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Supplier } from './Supplier';
import { User } from './User';

@Entity('order', { schema: 'fpis' })
// @Index('order_SupplierID_uindex', ['supplier'], { unique: true })
// @Index('order_user_id_fk', ['employee'])
export class Order extends BaseEntity {
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
  dateCreated: Date;

  @Column('varchar', {
    nullable: false,
    name: 'SerialNumber',
  })
  serialNumber: string;

  @Column('double', {
    nullable: true,
    name: 'TotalAmount',
  })
  totalAmount: number | null;

  //done
  @ManyToOne(type => User, user => user.orders, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'EmployeeID' })
  employee: User | null;

  //done
  @ManyToOne(type => Supplier, supplier => supplier.orders, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'SupplierID' })
  supplier: Supplier | null;
}
