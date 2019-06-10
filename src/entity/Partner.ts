import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { City } from './City';
import { Supplier } from './Supplier';

@Entity()
export class Partner extends BaseEntity {
  @PrimaryColumn('varchar', {
    nullable: false,
    name: 'tax_id_num',
  })
  taxIdNum: string;

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'address',
  })
  address: string;

  @ManyToOne(type => City, city => city.partners, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'city_area_code' })
  city: City | null;

  @OneToOne(type => Supplier, supplier => supplier.taxIdNum, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  supplier: Supplier | null;
}
