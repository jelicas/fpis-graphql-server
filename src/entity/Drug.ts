import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Atc } from './Atc';
import { Inn } from './Inn';
import { MeasurementUnit } from './MeasurementUnit';
import { PackageType } from './PackageType';
import { Product } from './Product';

@Entity('drug', { schema: 'fpis' })
// @Index('Drug_atc_ID_fk', ['atc'])
// @Index('Drug_inn_ID_fk', ['inn'])
// @Index('Drug_measurementunit_ID_fk', ['measurementUnit'])
// @Index('Drug_packagetype_ID_fk', ['packageType'])
// @Index('Drug_product_id_fk', ['product'])
export class Drug extends BaseEntity {
  //done
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

  //done
  @ManyToOne(type => MeasurementUnit, measurementUnit => measurementUnit.drugs, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MeasurementUnitID' })
  measurementUnit: MeasurementUnit | null;

  //done
  @ManyToOne(type => PackageType, packageType => packageType.drugs, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PackageTypeID' })
  packageType: PackageType | null;

  //done
  @ManyToOne(type => Atc, atc => atc.drugs, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ATCID' })
  atc: Atc | null;

  //done
  @ManyToOne(type => Inn, inn => inn.drugs, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'INNID' })
  inn: Inn | null;
}
