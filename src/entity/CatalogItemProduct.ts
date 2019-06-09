import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Product } from './Product';

@Entity('catalog_item_product', { schema: 'fpis' })
@Index('catalog_item_product_product_ID_fk', ['product'])
export class CatalogItemProduct {
  @Column('int', {
    nullable: false,
    primary: true,
    name: 'CatID',
  })
  catId: number;

  @Column('int', {
    nullable: false,
    primary: true,
    name: 'ItemNumber',
  })
  itemNumber: number;

  @ManyToOne(type => Product, product => product.catalogItemProducts, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product | null;
}
