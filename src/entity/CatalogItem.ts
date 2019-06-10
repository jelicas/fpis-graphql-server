import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { CatalogItemProduct } from './CatalogItemProduct';
import { Factory } from './Factory';
import { TaxType } from './TaxType';

@Entity()
export class CatalogItem extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'cat_id',
  })
  catId: string;

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'serial_number',
  })
  serialNumber: number;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    name: 'rfzo',
  })
  rfzo: boolean;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    name: 'drug',
  })
  isDrug: boolean;

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'measurement_unit',
  })
  measurementUnit: string;

  @Column('double', {
    nullable: false,
    name: 'price',
  })
  price: number;

  @Column('double', {
    nullable: true,
    name: 'discount',
  })
  discount: number | null;

  @ManyToOne(type => Factory, factory => factory.catalogItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'factory_id' })
  factory: Factory | null;

  @ManyToOne(type => TaxType, taxType => taxType.catalogItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tax_type_id' })
  taxType: TaxType | null;

  @OneToOne(type => CatalogItemProduct, catalogItemProduct => catalogItemProduct.catItem, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogItemProduct: CatalogItemProduct | null;
}
