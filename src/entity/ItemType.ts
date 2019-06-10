import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Item } from './Item';

@Entity()
export class ItemType extends BaseEntity {
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

  @OneToMany(type => Item, item => item.itemType, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  items: Item[];
}
