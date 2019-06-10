import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CatalogItemProduct } from './CatalogItemProduct';
import { Drug } from './Drug';
import { Factory } from './Factory';
import { Item } from './Item';
import { PriceHistory } from './PriceHistory';
import { ProductState } from './ProductState';
import { RequisitionItem } from './RequisitionItem';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column('double', {
    nullable: true,
    name: 'quantity',
  })
  quantity: number | null;

  @Column('double', {
    nullable: true,
    name: 'current_price',
  })
  currentPrice: number | null;

  @ManyToOne(type => Factory, factory => factory.products, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'factory_id' })
  factory: Factory | null;

  @OneToMany(type => CatalogItemProduct, catalogItemProduct => catalogItemProduct.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogItemProducts: CatalogItemProduct[];

  @OneToOne(type => Drug, drug => drug.product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  drug: Drug | null;

  @OneToOne(type => Item, item => item.product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  item: Item | null;

  @OneToMany(type => PriceHistory, priceHistory => priceHistory.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  priceHistory: PriceHistory[];

  @OneToMany(type => ProductState, productState => productState.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  productStates: ProductState[];

  @OneToMany(type => RequisitionItem, requisitionItem => requisitionItem.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  requisitionItems: RequisitionItem[];
}
