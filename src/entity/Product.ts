import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CatalogItemProduct } from './CatalogItemProduct';
import { Drug } from './Drug';
import { Factory } from './Factory';
import { ItemType } from './ItemType';
import { PriceHistory } from './PriceHistory';
import { ProductState } from './ProductState';
import { RequisitionItem } from './RequisitionItem';

@Entity('product', { schema: 'fpis' })
@Index('product_factory_id_fk', ['factory'])
export class Product {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'Name',
  })
  name: string;

  @Column('double', {
    nullable: true,
    name: 'Quantity',
  })
  quantity: number | null;

  @Column('double', {
    nullable: true,
    name: 'CurrentPrice',
  })
  currentPrice: number | null;

  @ManyToOne(type => Factory, factory => factory.products, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FactoryID' })
  factory: Factory | null;

  @OneToMany(type => CatalogItemProduct, catalogItemProduct => catalogItemProduct.product, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  catalogItemProducts: CatalogItemProduct[];

  @OneToOne(type => Drug, drug => drug.product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  drug: Drug | null;

  @OneToMany(type => PriceHistory, priceHistory => priceHistory.product, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  priceHistory: PriceHistory[];

  @OneToMany(type => ProductState, productState => productState.product, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  productStates: ProductState[];

  @OneToMany(type => RequisitionItem, requisitionItem => requisitionItem.product, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  requisitionItems: RequisitionItem[];

  @ManyToMany(type => ItemType, itemType => itemType.products, { nullable: false })
  @JoinTable({ name: 'item' })
  itemTypes: ItemType[];
}
