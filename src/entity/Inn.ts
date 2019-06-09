import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from './Drug';

@Entity('inn', { schema: 'fpis' })
export class Inn extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  ID: number;

  @Column('int', {
    nullable: false,
    name: 'Name',
  })
  Name: number;

  @OneToMany(type => Drug, drug => drug.inn, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  drugs: Drug[];
}
