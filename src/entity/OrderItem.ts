import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RequisitionItem } from './RequisitionItem';
import { Supplier } from './Supplier';

@Entity('order_item', { schema: 'fpis' })
@Index('order_item_OrderID_uindex', ['OrderID'], { unique: true })
@Index('order_item_requisiton_item_RequistionID_SerialNumber_fk', [
  'requisition',
  'requisitionItem',
])
@Index('order_item_SupplierID_uindex', ['supplier'], { unique: true })
export class OrderItem {
  @Column('int', {
    nullable: false,
    primary: true,
    name: 'OrderID',
  })
  orderId: number;

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'SerialNumber',
  })
  serialNumber: number;

  @ManyToOne(type => RequisitionItem, requisitionItem => requisitionItem.orderItems, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RequisitionID' })
  requisition: RequisitionItem | null;

  @ManyToOne(type => RequisitionItem, requisitionItem => requisitionItem.orderItems2, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RequisitionItemID' })
  requisitionItem: RequisitionItem | null;

  @OneToOne(type => Supplier, supplier => supplier.orderItem, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'SupplierID' })
  supplier: Supplier | null;
}
