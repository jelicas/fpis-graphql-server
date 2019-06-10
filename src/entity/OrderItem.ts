import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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
}
