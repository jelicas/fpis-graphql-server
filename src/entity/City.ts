import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';

import { Partner } from './Partner';

@Entity('city', { schema: 'fpis' })
export class City extends BaseEntity {
  @Column('varchar', {
    nullable: false,
    primary: true,
    name: 'AreaCode',
  })
  areaCode: string;

  @Column('varchar', {
    nullable: false,
    name: 'Name',
  })
  name: string;

  @OneToMany(type => Partner, partner => partner.city, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  partners: Partner[];
}
