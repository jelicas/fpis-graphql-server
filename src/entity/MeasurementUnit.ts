import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from './Drug';

@Entity()
export class MeasurementUnit extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @OneToMany(type => Drug, drug => drug.measurementUnit, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  drugs: Drug[];
}
