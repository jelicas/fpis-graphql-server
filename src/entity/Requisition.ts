import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RequisitionItem } from './RequisitionItem';
import { User } from './User';

@Entity('requisition', { schema: 'fpis' })
// @Index('Requisition_user_id_fk', ['employee'])
export class Requisition {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  id: number;

  @Column('int', {
    nullable: true,
    name: 'DateCreated',
  })
  dateCreated: number | null;

  @Column('varchar', {
    nullable: true,
    name: 'SerialNumber',
  })
  serialNumber: string | null;

  //done
  @ManyToOne(type => User, user => user.requisitions, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'EmployeeID' })
  employee: User | null;

  //done
  @OneToMany(type => RequisitionItem, requisitionItem => requisitionItem.requisition, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  requisitionItems: RequisitionItem[];
}
