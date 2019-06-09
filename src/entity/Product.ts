import {
  BaseEntity,
  Column,
  Entity,
  Index,
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

@Entity('product', { schema: 'fpis' })
@Index('product_factory_id_fk', ['factory'])
export class Product extends BaseEntity {
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

  //done
  @ManyToOne(type => Factory, factory => factory.products, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FactoryID' })
  factory: Factory | null;

  //done
  @OneToMany(type => CatalogItemProduct, catalogItemProduct => catalogItemProduct.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogItemProducts: CatalogItemProduct[];

  //done
  @OneToOne(type => Drug, drug => drug.product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  drug: Drug | null;

  //done
  @OneToOne(type => Item, item => item.product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  item: Item | null;

  //done
  @OneToMany(type => PriceHistory, priceHistory => priceHistory.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  priceHistory: PriceHistory[];

  //done
  @OneToMany(type => ProductState, productState => productState.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  productStates: ProductState[];

  //done
  @OneToMany(type => RequisitionItem, requisitionItem => requisitionItem.product, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  requisitionItems: RequisitionItem[];
}
