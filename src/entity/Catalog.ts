import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { CatalogItem } from './CatalogItem';
import { Supplier } from './Supplier';

@Entity()
export class Catalog extends BaseEntity {
  @PrimaryColumn({
    type: 'varchar',
    name: 'id',
  })
  id: string;

  @Column('date', {
    nullable: true,
    name: 'date',
  })
  date: string | null;

  @ManyToOne(type => Supplier, supplier => supplier.catalogs, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tax_id_num' })
  supplier: Supplier;

  @OneToMany(type => CatalogItem, catalogItem => catalogItem.catalog, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  catalogItems: CatalogItem[];
}
