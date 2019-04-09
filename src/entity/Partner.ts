import { BaseEntity, PrimaryColumn, Column, ManyToOne, Entity, OneToOne } from 'typeorm';
import { City } from './City';
import { Supplier } from './Supplier';

@Entity()
export class Partner extends BaseEntity {
	@PrimaryColumn() taxIdNum: string;
	@Column() name: string;
	@Column() address: string;
	@ManyToOne((type) => City, (city) => city.partners)
	city: City;

	@OneToOne((type) => Supplier, (supplier) => supplier.partner)
	supplier: Supplier | null;
}
