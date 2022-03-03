import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('user')
export class UserType {
  @Field((type) => ID, { description: 'id of the user' })
  id: string;

  @Field(() => String, { description: 'first name of the user '})
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => String, { description: 'password of the user '})
  password: string;

  @Field(() => Number, { description:  'Country Code'})
  country: number;

  @Field(() => String, { description: 'Address of the user' })
  address: string;
}