import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloError } from 'apollo-server-core';

export const gcpFormatError = (error: GraphQLError): GraphQLFormattedError<Record<string, any>> | undefined => {
    if (error.originalError instanceof ApolloError) {
        console.warn(error.message, error.originalError); // faccio un warn perchè Apollo error corrisponde a un 4xx error (utente)
        return error;
    }
    else {
        console.error(error.message, error.originalError);
        return process.env.NODE_ENV === 'production' ? { message: 'Internal Server Error' } : error;
    }
}