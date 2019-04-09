import { IResolverObject } from 'graphql-tools';
import { City } from '../../entity/City';
import { Supplier } from '../../entity/Supplier';
import { Partner } from '../../entity/Partner';

export const resolvers: IResolverObject = {
	Supplier: {
		name: (root) => {
			console.log(root);
			return root.partner.name;
		},
		address: (root) => root.partner.address,
		city: (root) => root.partner.city
	},
	Query: {
		getCities: () => City.find(),
		getSuppliers: () => Supplier.find({ relations: [ 'partner', 'partner.city' ] }),
		getSupplier: (_, { taxIdNum }) => Supplier.findOne(taxIdNum)
	},
	Mutation: {
		addSupplier: async (_, { taxIdNum, regNum, name, address, city }) => {
			const newCity = await City.findOne(city);
			const newPartner = await Partner.create({ taxIdNum, name, address, city: newCity }).save();
			return await Supplier.create({ taxIdNum, regNum, partner: newPartner }).save();
		},
		updateSupplier: async (_, { taxIdNum, regNum, name, address, city }) => {
			const newCity = await City.findOne(city);
			await Partner.update(taxIdNum, { name, address, city: newCity });
			await Supplier.update(taxIdNum, { regNum });
			return await Supplier.findOne(taxIdNum);
		},
		deleteSupplier: async (_, { taxIdNum }) => {
			await Supplier.delete(taxIdNum);
			await Partner.delete(taxIdNum);
			return true;
		}
	}
};
