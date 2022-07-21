import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignInType {
  @Field()
  accessToken: string;
}