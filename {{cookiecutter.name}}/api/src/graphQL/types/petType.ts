import { IPetEntity, PetType } from '../../services/pets/petEntity';
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

class Pet {

    public name = "Pet";
    public description = "This represent a Pet";

    public fields = () => {

        return {

            id: {
                type: new GraphQLNonNull(GraphQLString),
            },
            fullName: {
                type: GraphQLString,
                resolve: (pet: IPetEntity) => {
                    const petTypeValue = PetType[pet.petType]
                    return `A ${petTypeValue} named ${pet.name}`
                }
            },
            name: {
                type: GraphQLString
            },
            petType: {
                type: GraphQLString
            }
        }

    }

}

export const PetGraphQLType = new GraphQLObjectType(new Pet());