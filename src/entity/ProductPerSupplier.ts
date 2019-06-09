import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { RequisitionItem } from './RequisitionItem';
import { Supplier } from './Supplier';

@Entity('product_per_supplier', { schema: 'fpis' })
@Index('productpersupplier_TaxIdNum_uindex', ['taxIdNum'], { unique: true })
export class ProductPerSupplier {
  @ManyToOne(type => RequisitionItem, requisitionItem => requisitionItem.productPerSuppliers, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RequisitionID' })
  requisition: RequisitionItem | null;

  @ManyToOne(type => RequisitionItem, requisitionItem => requisitionItem.productPerSuppliers2, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ItemSerialNumber' })
  itemSerialNumber: RequisitionItem | null;

  @OneToOne(type => Supplier, supplier => supplier.productPerSupplier, {
    primary: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TaxIdNum' })
  taxIdNum: Supplier | null;

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
}
