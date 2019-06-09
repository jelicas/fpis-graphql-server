import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Supplier } from './Supplier';

@Entity('catalog', { schema: 'fpis' })
export class Catalog extends BaseEntity {
  @PrimaryColumn({
    type: 'varchar',
    name: 'ID',
  })
  id: string;

  @Column('date', {
    nullable: true,
    name: 'Date',
  })
  date: string | null;

  @ManyToOne(type => Supplier, supplier => supplier.catalogs, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TaxIdNum' })
  supplier: Supplier | null;
}
