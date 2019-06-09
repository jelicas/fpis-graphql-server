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

@Entity('catalog_item', { schema: 'fpis' })
// @Index('CatalogItem_factory_id_fk', ['factory'])
// @Index('catalogitem_taxtype_ID_fk', ['taxType'])
export class CatalogItem extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'CatID',
  })
  catId: string;

  @Column('int', {
    nullable: false,
    primary: true,
    name: 'SerialNumber',
  })
  serialNumber: number;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    name: 'RFZO',
  })
  rfzo: boolean;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    name: 'Drug',
  })
  isDrug: boolean;

  @Column('varchar', {
    nullable: false,
    name: 'Name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'MeasurementUnit',
  })
  measurementUnit: string;

  @Column('double', {
    nullable: false,
    name: 'Price',
  })
  price: number;

  @Column('double', {
    nullable: true,
    name: 'Discount',
  })
  discount: number | null;

  //done
  @ManyToOne(type => Factory, factory => factory.catalogItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FactoryID' })
  factory: Factory | null;

  //done
  @ManyToOne(type => TaxType, taxType => taxType.catalogItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TaxTypeID' })
  taxType: TaxType | null;

  @OneToOne(type => CatalogItemProduct, catalogItemProduct => catalogItemProduct.catItem, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogItemProduct: CatalogItemProduct | null;

  @OneToOne(type => CatalogItemProduct, catalogItemProduct => catalogItemProduct.catItemNum, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogItemProductNum: CatalogItemProduct | null;
}
