import { Column, Entity, OneToMany } from 'typeorm';

import { Partner } from './Partner';

@Entity('city', { schema: 'fpis' })
export class City {
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

  @OneToMany(type => Partner, partner => partner.cityAreaCode, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  partners: Partner[];
}
