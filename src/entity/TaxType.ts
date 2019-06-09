import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CatalogItem } from './CatalogItem';

@Entity('tax_type', { schema: 'fpis' })
export class TaxType extends BaseEntity {
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

  @OneToMany(type => CatalogItem, catalogItem => catalogItem.taxType, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogItems: CatalogItem[];
}
