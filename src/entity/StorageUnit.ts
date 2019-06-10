import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductState } from './ProductState';

@Entity()
export class StorageUnit extends BaseEntity {
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

  @OneToMany(type => ProductState, productState => productState.storageUnit, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  productStates: ProductState[];
}
