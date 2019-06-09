import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from './Drug';

@Entity('measurement_unit', { schema: 'fpis' })
export class MeasurementUnit extends BaseEntity {
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

  @OneToMany(type => Drug, drug => drug.measurementUnit, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  drugs: Drug[];
}
