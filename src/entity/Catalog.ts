import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Supplier } from './Supplier';

@Entity('catalog', { schema: 'fpis' })
@Index('catalog_taxIdNum_uindex', ['taxIdNum'], { unique: true })
export class Catalog {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  id: number;

  @Column('date', {
    nullable: true,
    name: 'Date',
  })
  date: string | null;

  @OneToOne(type => Supplier, supplier => supplier.catalog, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TaxIdNum' })
  taxIdNum: Supplier | null;
}
