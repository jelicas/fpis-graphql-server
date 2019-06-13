import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Order } from './Order';
import { ProductPerSupplier } from './ProductPerSupplier';

@Entity()
export class OrderItem extends BaseEntity {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'order_id',
  })
  orderId: number;

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'serial_number',
  })
  serialNumber: number;

  @Column({
    name: 'requisition_id',
  })
  requisitionId: number;

  @Column({
    name: 'item_serial_number',
  })
  itemSerialNumber: number;

  @Column({
    name: 'supplier_id',
  })
  supplierId: number;

  @OneToOne(type => ProductPerSupplier, productPerSupplier => productPerSupplier.orderItem, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'requisition_id', referencedColumnName: 'requisitionId' },
    { name: 'item_serial_number', referencedColumnName: 'itemSerialNumber' },
    { name: 'supplier_id', referencedColumnName: 'taxIdNum' },
  ])
  requisition: ProductPerSupplier | null;

  @ManyToOne(type => Order, order => order.orderItems, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
