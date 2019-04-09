import { BaseEntity, Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Partner } from './Partner';

@Entity()
export class City extends BaseEntity {
	@PrimaryColumn() areaCode: string;

	@Column() name: string;

	@OneToMany((type) => Partner, (partner) => partner.city)
	partners: Partner[];
}
