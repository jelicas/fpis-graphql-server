import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { ProductPerSupplier } from './ProductPerSupplier';

@Entity('order_item', { schema: 'fpis' })
// @Index('order_item_OrderID_uindex', ['OrderID'], { unique: true })
// @Index('order_item_requisiton_item_RequistionID_SerialNumber_fk', [
//   'requisition',
//   'requisitionItem',
// ])
// @Index('order_item_SupplierID_uindex', ['supplier'], { unique: true })
export class OrderItem extends BaseEntity {
  @Column('int', {
    nullable: false,
    primary: true,
    name: 'OrderID',
  })
  orderId: number;

  @Column('int', {
    nullable: false,
    primary: true,
    name: 'SerialNumber',
  })
  serialNumber: number;

  @OneToOne(type => ProductPerSupplier, productPerSupplier => productPerSupplier.orderItemReq, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RequisitionID' })
  requisition: ProductPerSupplier | null;

  @OneToOne(type => ProductPerSupplier, productPerSupplier => productPerSupplier.orderItemSerNum, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RequisitionItemID' })
  requisitionItem: ProductPerSupplier | null;

  @OneToOne(
    type => ProductPerSupplier,
    productPerSupplier => productPerSupplier.orderItemSupplier,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'SupplierID' })
  supplier: ProductPerSupplier | null;
}
