import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Atc } from './Atc';
import { Inn } from './Inn';
import { MeasurementUnit } from './MeasurementUnit';
import { PackageType } from './PackageType';
import { Product } from './Product';

@Entity()
export class Drug extends BaseEntity {
  @OneToOne(type => Product, product => product.drug, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  @Column('varchar', {
    nullable: true,
    name: 'drug_id',
  })
  drugId: string | null;

  @Column('double', {
    nullable: true,
    name: 'package_dose',
  })
  packageDose: number | null;

  @Column('integer', {
    nullable: true,
    name: 'items_per_package',
  })
  itemsPerPackage: number | null;

  @ManyToOne(type => MeasurementUnit, measurementUnit => measurementUnit.drugs, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'measurement_unit_id' })
  measurementUnit: MeasurementUnit | null;

  @ManyToOne(type => PackageType, packageType => packageType.drugs, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'package_type_id' })
  packageType: PackageType | null;

  @ManyToOne(type => Atc, atc => atc.drugs, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'atc_id' })
  atc: Atc | null;

  @ManyToOne(type => Inn, inn => inn.drugs, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'inn_id' })
  inn: Inn | null;
}
