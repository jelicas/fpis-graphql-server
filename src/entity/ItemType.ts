import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Item } from './Item';

@Entity('item_type', { schema: 'fpis' })
export class ItemType extends BaseEntity {
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

  @OneToMany(type => Item, item => item.itemType, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  items: Item[];
}
