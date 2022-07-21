import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { SignUpCredentialsInput } from "../dto/auth/sign-up-credentials.input";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpCredentialsInput: SignUpCredentialsInput): Promise<User> {
    const { email, firstName, password, lastName, country, address } = signUpCredentialsInput;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      country,
      address
    });
    try{
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with same email address already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}