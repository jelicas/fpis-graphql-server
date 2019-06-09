import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CatalogItem } from './CatalogItem';

@Entity('tax_type', { schema: 'fpis' })
export class TaxType {
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
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  catalogItems: CatalogItem[];
}
