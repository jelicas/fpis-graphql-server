import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { OrderItem } from './OrderItem';
import { Product } from './Product';
import { ProductPerSupplier } from './ProductPerSupplier';
import { Requisition } from './Requisition';

@Entity('requisiton_item', { schema: 'fpis' })
@Index('requisiton_item_product_id_fk', ['product'])
export class RequisitionItem {
  @ManyToOne(type => Requisition, requisition => requisition.requisitionItems, {
    primary: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RequistionID' })
  requisition: Requisition | null;

  @Column('int', {
    nullable: false,
    primary: true,
    name: 'SerialNumber',
  })
  serialNumber: number;

  @Column('double', {
    nullable: true,
    name: 'OrderedQuantity',
  })
  orderedQuantity: number | null;

  @Column('double', {
    nullable: true,
    name: 'TotalQuantity',
  })
  totalQuantity: number | null;

  @ManyToOne(type => Product, product => product.requisitionItems, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product | null;

  @OneToMany(type => OrderItem, orderItem => orderItem.requisition, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  orderItems: OrderItem[];

  @OneToMany(type => OrderItem, orderItem => orderItem.requisitionItem, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  orderItems2: OrderItem[];

  @OneToMany(type => ProductPerSupplier, productPerSupplier => productPerSupplier.requisition, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productPerSuppliers: ProductPerSupplier[];

  @OneToMany(
    type => ProductPerSupplier,
    productPerSupplier => productPerSupplier.itemSerialNumber,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  productPerSuppliers2: ProductPerSupplier[];
}
