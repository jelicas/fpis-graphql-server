import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from './Drug';

@Entity('atc', { schema: 'fpis' })
export class Atc {
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

  @OneToMany(type => Drug, drug => drug.atc, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  drugs: Drug[];
}
