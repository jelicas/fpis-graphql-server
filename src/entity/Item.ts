import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { ItemType } from './ItemType';
import { Product } from './Product';

@Entity('item', { schema: 'fpis' })
export class Item extends BaseEntity {
  @OneToOne(type => Product, product => product.drug, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product | null;

  //done
  @ManyToOne(type => ItemType, itemType => itemType.items, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ItemTypeID' })
  itemType: ItemType | null;
}
