import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';

import { Partner } from './Partner';

@Entity()
export class City extends BaseEntity {
  @Column('varchar', {
    nullable: false,
    primary: true,
    name: 'area_code',
  })
  areaCode: string;

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @OneToMany(type => Partner, partner => partner.city, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  partners: Partner[];
}
