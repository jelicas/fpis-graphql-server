import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import schema from './schema';

createConnection()
	.then(async (connection) => {
		//Create Apollo/GraphQl Server using typeDefs, resolvers and context object
		const server = new ApolloServer({ schema });

		server.listen(5000).then(({ url }) => {
			console.log(`Server listening on ${url}`);
		});
	})
	.catch((error) => console.log(error));
