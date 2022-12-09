import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUser(alias: string): Promise<User> {
    return this.usersRepository.findOneBy({ alias });
  }

  async login(alias: string, password: string): Promise<User> {
    const user = await this.findUser(alias);
    console.log(user);
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Credentials');
    }
    return user;
  }

  updateProfile(
    userId: number,
    updateUserDetails: {
      name: string;
      alias: string;
    },
  ) {
    return this.usersRepository.update({ userId }, { ...updateUserDetails });
  }

  async updatePassword(
    userId: number,
    updateUserDetails: {
      password: string;
    },
  ) {
    const hashedpassword = await bcrypt.hash(updateUserDetails.password, 12);
    return this.usersRepository.update(
      { userId },
      { password: hashedpassword },
    );
  }

  async create(name: string, alias: string, password: string): Promise<User> {
    const user = await this.findUser(alias);
    if (user) {
      throw new BadRequestException('Invalid Username');
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    return this.usersRepository.save({ name, alias, password: hashedpassword });
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
