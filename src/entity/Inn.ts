import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from './Drug';

@Entity('inn', { schema: 'fpis' })
export class Inn {
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

  @OneToMany(type => Drug, drug => drug.inn, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  drugs: Drug[];
}
