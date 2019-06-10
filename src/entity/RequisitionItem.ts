import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Product } from './Product';
import { ProductPerSupplier } from './ProductPerSupplier';
import { Requisition } from './Requisition';

@Entity()
export class RequisitionItem {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'requistion_id',
  })
  requistionId: number;

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'serial_number',
  })
  serialNumber: number;

  @ManyToOne(type => Requisition, requisition => requisition.requisitionItems, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'requistion_id' })
  requisition: Requisition;

  @Column('double', {
    nullable: true,
    name: 'ordered_quantity',
  })
  orderedQuantity: number | null;

  @Column('double', {
    nullable: true,
    name: 'total_quantity',
  })
  totalQuantity: number | null;

  @ManyToOne(type => Product, product => product.requisitionItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  @OneToMany(type => ProductPerSupplier, productPerSupplier => productPerSupplier.requisition, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productPerSuppliersReq: ProductPerSupplier[];
}
