import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { City } from './City';
import { Supplier } from './Supplier';

@Entity('partner', { schema: 'fpis' })
// @Index('Partner_city_areaCode_fk', ['cityAreaCode'])
export class Partner extends BaseEntity {
  @PrimaryColumn('varchar', {
    nullable: false,
    name: 'TaxIdNum',
  })
  taxIdNum: string;

  @Column('varchar', {
    nullable: false,
    name: 'Name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'Address',
  })
  address: string;

  //done
  @ManyToOne(type => City, city => city.partners, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'CityAreaCode' })
  city: City | null;

  //done
  @OneToOne(type => Supplier, supplier => supplier.taxIdNum, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  supplier: Supplier | null;
}
