import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { CatalogItem } from './CatalogItem';
import { Product } from './Product';

@Entity('catalog_item_product', { schema: 'fpis' })
// @Index('catalog_item_product_product_ID_fk', ['product'])
export class CatalogItemProduct extends BaseEntity {
  @PrimaryColumn({
    name: 'CatID',
  })
  catId: number;

  @PrimaryColumn({
    name: 'ItemNumber',
  })
  itemNumber: number;

  @OneToOne(type => CatalogItem, catalogItem => catalogItem.catalogItemProduct, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'CatID' })
  catItem: CatalogItem | null;

  @OneToOne(type => CatalogItem, catalogItem => catalogItem.catalogItemProductNum, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ItemNumber' })
  catItemNum: CatalogItem | null;

  @ManyToOne(type => Product, product => product.catalogItemProducts, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product | null;
}
