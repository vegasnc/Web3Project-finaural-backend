import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class SignUpCredentialsInput {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field()
  firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak'
  })
  @Field()
  password: string;
}