import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Product } from './Product';
import { StorageUnit } from './StorageUnit';

@Entity()
export class ProductState extends BaseEntity {
  @ManyToOne(type => StorageUnit, storageUnit => storageUnit.productStates, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'storage_unit_id' })
  storageUnit: StorageUnit | null;

  @ManyToOne(type => Product, product => product.productStates, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  @Column('double', {
    nullable: true,
    name: 'quantity',
  })
  quantity: number | null;
}
