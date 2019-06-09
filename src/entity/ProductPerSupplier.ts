import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { OrderItem } from './OrderItem';
import { RequisitionItem } from './RequisitionItem';
import { Supplier } from './Supplier';

@Entity('product_per_supplier', { schema: 'fpis' })
// @Index('productpersupplier_TaxIdNum_uindex', ['taxIdNum'], { unique: true })
export class ProductPerSupplier extends BaseEntity {
  @ManyToOne(type => RequisitionItem, requisitionItem => requisitionItem.productPerSuppliersReq, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RequisitionID' })
  requisition: RequisitionItem | null;

  @ManyToOne(
    type => RequisitionItem,
    requisitionItem => requisitionItem.productPerSuppliersSerNumItem,
    {
      primary: true,
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'ItemSerialNumber' })
  itemSerialNumber: RequisitionItem | null;

  @ManyToOne(type => Supplier, supplier => supplier.productsPerSupplier, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TaxIdNum' })
  supplier: Supplier | null;

  @Column('double', {
    nullable: true,
    name: 'OrderedQuantity',
  })
  orderedQuantity: number | null;

  @Column('double', {
    nullable: true,
    name: 'OrderQuantity',
  })
  orderQuantity: number | null;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    name: 'Ordered',
  })
  ordered: boolean | null;

  @OneToOne(type => OrderItem, orderItem => orderItem.requisition, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  orderItemReq: OrderItem | null;

  @OneToOne(type => OrderItem, orderItem => orderItem.requisitionItem, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  orderItemSerNum: OrderItem | null;

  @OneToOne(type => OrderItem, orderItem => orderItem.supplier, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  orderItemSupplier: OrderItem | null;
}
