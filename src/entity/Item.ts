import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { ItemType } from './ItemType';
import { Product } from './Product';

@Entity()
export class Item extends BaseEntity {
  @OneToOne(type => Product, product => product.drug, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  @ManyToOne(type => ItemType, itemType => itemType.items, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'item_type_id' })
  itemType: ItemType | null;
}
