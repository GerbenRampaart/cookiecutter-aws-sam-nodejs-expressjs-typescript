import { IPetEntity, PetType } from '../../services/pets/petEntity';
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export interface IPet {
    id: string;
    name: string;
    fullName: string;
    petType: string;
}

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
                type: GraphQLString,
                resolver: (pet: IPetEntity) => {
                    return PetType[pet.petType];
                }
            }
        }

    }

}

export const PetGraphQLType = new GraphQLObjectType(new Pet());