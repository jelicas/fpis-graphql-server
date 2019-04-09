import { BaseEntity, PrimaryColumn, Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Partner } from './Partner';

@Entity()
export class Supplier extends BaseEntity {
	@PrimaryColumn() taxIdNum: string;
	@Column() regNum: string;

	@OneToOne((type) => Partner, (partner) => partner.supplier)
	@JoinColumn({ name: 'taxIdNum' })
	partner: Partner | null;
}
