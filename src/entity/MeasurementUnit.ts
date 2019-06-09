import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from './Drug';

@Entity('measurement_unit', { schema: 'fpis' })
export class MeasurementUnit {
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
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  drugs: Drug[];
}
