import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Atc } from './Atc';
import { Inn } from './Inn';
import { MeasurementUnit } from './MeasurementUnit';
import { PackageType } from './PackageType';
import { Product } from './Product';

@Entity('drug', { schema: 'fpis' })
@Index('Drug_atc_ID_fk', ['atc'])
@Index('Drug_inn_ID_fk', ['inn'])
@Index('Drug_measurementunit_ID_fk', ['measurementUnit'])
@Index('Drug_packagetype_ID_fk', ['packageType'])
@Index('Drug_product_id_fk', ['product'])
export class Drug {
  @OneToOne(type => Product, product => product.drug, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product | null;

  @Column('varchar', {
    nullable: true,
    name: 'DrugID',
  })
  drugId: string | null;

  @Column('double', {
    nullable: true,
    name: 'PackageDose',
  })
  packageDose: number | null;

  @Column('int', {
    nullable: true,
    name: 'ItemsPerPackage',
  })
  itemsPerPackage: number | null;

  @ManyToOne(type => MeasurementUnit, measurementUnit => measurementUnit.drugs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MeasurementUnitID' })
  measurementUnit: MeasurementUnit | null;

  @ManyToOne(type => PackageType, packageType => packageType.drugs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PackageTypeID' })
  packageType: PackageType | null;

  @ManyToOne(type => Atc, atc => atc.drugs, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ATCID' })
  atc: Atc | null;

  @ManyToOne(type => Inn, inn => inn.drugs, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'INNID' })
  inn: Inn | null;
}
