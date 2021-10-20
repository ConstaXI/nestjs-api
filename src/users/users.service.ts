import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRole } from './entities/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    const user = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(user);
  }

  async createAdmin(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    const admin = this.usersRepository.create({
      ...createUserInput,
      role: UserRole.ADMIN,
    });

    return this.usersRepository.save(admin);
  }

  async updateUser(
    user: User,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersRepository.save({ id: user.id, ...updateUserInput });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { email: email } });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  async deleteUser(user: User): Promise<User> {
    return user.remove();
  }
}
