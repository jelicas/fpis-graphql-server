import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CatalogItem } from './CatalogItem';
import { Product } from './Product';

@Entity('factory', { schema: 'fpis' })
export class Factory {
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

  @OneToMany(type => CatalogItem, catalogItem => catalogItem.factory, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  catalogItems: CatalogItem[];

  @OneToMany(type => Product, product => product.factory, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  products: Product[];
}
