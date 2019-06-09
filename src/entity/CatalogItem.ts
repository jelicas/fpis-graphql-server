import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Factory } from './Factory';
import { TaxType } from './TaxType';

@Entity('catalog_item', { schema: 'fpis' })
@Index('CatalogItem_factory_id_fk', ['factory'])
@Index('catalogitem_taxtype_ID_fk', ['taxType'])
export class CatalogItem {
  @Column('int', {
    nullable: false,
    primary: true,
    name: 'CatID',
  })
  catId: number;

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
  drug: boolean;

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

  @ManyToOne(type => Factory, factory => factory.catalogItems, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FactoryID' })
  factory: Factory | null;

  @ManyToOne(type => TaxType, taxType => taxType.catalogItems, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TaxTypeID' })
  taxType: TaxType | null;
}
