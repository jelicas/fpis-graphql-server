import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CatalogItem } from './CatalogItem';
import { Product } from './Product';

@Entity()
export class Factory extends BaseEntity {
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

  @OneToMany(type => CatalogItem, catalogItem => catalogItem.factory, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogItems: CatalogItem[];

  @OneToMany(type => Product, product => product.factory, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  products: Product[];
}
