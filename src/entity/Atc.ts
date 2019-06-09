import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from './Drug';

@Entity('atc', { schema: 'fpis' })
export class Atc extends BaseEntity {
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

  @OneToMany(type => Drug, drug => drug.atc, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  drugs: Drug[];
}
