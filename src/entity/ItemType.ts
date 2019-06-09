import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './Product';

@Entity('item_type', { schema: 'fpis' })
export class ItemType {
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

  @ManyToMany(type => Product, product => product.itemTypes)
  products: Product[];
}
