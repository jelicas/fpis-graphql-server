import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from './Drug';

@Entity('package_type', { schema: 'fpis' })
export class PackageType {
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

  @OneToMany(type => Drug, drug => drug.packageType, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  drugs: Drug[];
}
