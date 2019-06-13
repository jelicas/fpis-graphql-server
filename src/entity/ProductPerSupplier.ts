import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { OrderItem } from './OrderItem';
import { RequisitionItem } from './RequisitionItem';
import { Supplier } from './Supplier';

@Entity()
export class ProductPerSupplier extends BaseEntity {
  @PrimaryColumn({ type: 'integer', name: 'requisition_id' })
  requisitionId: number;

  @PrimaryColumn({ name: 'item_serial_number' })
  itemSerialNumber: number;

  @PrimaryColumn({ name: 'tax_id_num' })
  taxIdNum: string;

  @ManyToOne(type => RequisitionItem, requisitionItem => requisitionItem.productPerSuppliersReq, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'requisition_id', referencedColumnName: 'requisitionId' },
    { name: 'item_serial_number', referencedColumnName: 'serialNumber' },
  ])
  requisition: RequisitionItem | null;

  @ManyToOne(type => Supplier, supplier => supplier.productsPerSupplier, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tax_id_num' })
  supplier: Supplier | null;

  @Column('double', {
    nullable: true,
    name: 'ordered_quantity',
  })
  orderedQuantity: number | null;

  @Column('double', {
    nullable: true,
    name: 'order_quantity',
  })
  orderQuantity: number | null;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    name: 'ordered',
  })
  ordered: boolean | null;

  @OneToOne(type => OrderItem, orderItem => orderItem.requisition, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  orderItem: OrderItem | null;
}
