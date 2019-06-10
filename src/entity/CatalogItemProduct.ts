import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { CatalogItem } from './CatalogItem';
import { Product } from './Product';

@Entity()
export class CatalogItemProduct extends BaseEntity {
  @PrimaryColumn({
    name: 'cat_id',
    type: 'varchar',
  })
  catId: string;

  @PrimaryColumn({
    name: 'item_number',
    type: 'integer',
  })
  itemNumber: number;

  @OneToOne(type => CatalogItem, catalogItem => catalogItem.catalogItemProduct, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'cat_id', referencedColumnName: 'catId' },
    { name: 'item_number', referencedColumnName: 'serialNumber' },
  ])
  catItem: CatalogItem;

  @ManyToOne(type => Product, product => product.catalogItemProducts, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product | null;
}
