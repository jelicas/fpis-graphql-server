import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Product } from './Product';
import { StorageUnit } from './StorageUnit';

@Entity('product_state', { schema: 'fpis' })
// @Index('product_state_product_ID_fk', ['product'])
export class ProductState extends BaseEntity {
  //done
  @ManyToOne(type => StorageUnit, storageUnit => storageUnit.productStates, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'StorageUnitID' })
  storageUnit: StorageUnit | null;

  @ManyToOne(type => Product, product => product.productStates, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product | null;

  @Column('double', {
    nullable: true,
    name: 'Quantity',
  })
  quantity: number | null;
}
