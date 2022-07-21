import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../core/repository/user.repository";
import { JwtService } from "@nestjs/jwt";
import { SignUpCredentialsInput } from "../core/dto/auth/sign-up-credentials.input";
import { SignInCredentialsInput } from "../core/dto/auth/sign-in-credentials.input";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "../core/jwt/jwt-payload.interface";
import { User } from "../core/entities/user.entity";
import { SignInType } from "../core/types/signIn.type";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(signUpCredentialsInput: SignUpCredentialsInput): Promise<User> {
    return this.userRepository.signUp(signUpCredentialsInput);
  }

  async signIn(signInCredentialsInput: SignInCredentialsInput): Promise<SignInType> {
    const { email, password } = signInCredentialsInput;
    const user = await this.userRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your sign in credentials')
    }
  }
}
