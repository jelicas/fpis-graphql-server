import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CatalogItem } from './CatalogItem';

@Entity()
export class TaxType extends BaseEntity {
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

  @OneToMany(type => CatalogItem, catalogItem => catalogItem.taxType, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogItems: CatalogItem[];
}
