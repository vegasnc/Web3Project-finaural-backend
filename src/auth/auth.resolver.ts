import { UserType } from "../core/types/user.type";
import { AuthService } from "./auth.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SignUpCredentialsInput } from "../core/dto/auth/sign-up-credentials.input";
import { SignInCredentialsInput } from "../core/dto/auth/sign-in-credentials.input";
import { SignInType } from "../core/types/signIn.type";

@Resolver(of => UserType)
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}

  @Mutation(returns => UserType)
  async signUp(
    @Args('signUpCredentialsInput') signUpCredentialsInput: SignUpCredentialsInput
  ) {
    await this.authService.signUp(signUpCredentialsInput);
  }

  @Query(returns => SignInType)
  async signIn(
    @Args('signInCredentialsInput') signInCredentialsInput: SignInCredentialsInput
  ) {
    await this.authService.signIn(signInCredentialsInput);
  }
}