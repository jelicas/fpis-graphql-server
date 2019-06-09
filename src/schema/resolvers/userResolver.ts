import { IResolverObject } from 'graphql-tools';

import { TypeOfEmployee } from '../../entity/TypeOfEmployee';
import { User } from '../../entity/User';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign(
    {
      username,
      email,
    },
    'secret',
    {
      expiresIn,
    }
  );
};

export const resolvers: IResolverObject = {
  Query: {
    getUser: (_, { id }) => User.findOne(id),
    signinUser: async (_, { username, password }) => {
      console.log(User);
      const user = await User.findOne({
        username,
      });
      if (!user) {
        throw new Error('User not found');
      }
      //const isValidPassword = await bcrypt.compare(password, user.password);
      if (password !== user.password) {
        throw new Error('Invalid password');
      }
      return {
        token: createToken(user, process.env.SECRET, '1hr'),
      };
    },
  },
  Mutation: {
    addTypeOfEmployee: async (_, { title }) => {
      const newType = new TypeOfEmployee();
      newType.title = title;
      return await newType.save();
    },
    signupUser: async (
      _,
      { username, email, password, pid, name, surname, telephone, biography, address, type }
    ) => {
      const user = await User.findOne({
        username,
      });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await User.create({
        username,
        email,
        password,
        pid,
        name,
        surname,
        telephone,
        biography,
        address,
        type,
      }).save();
      return {
        token: createToken(newUser, 'asasasaasasasasasas', '1hr'),
      };
    },
  },
};
