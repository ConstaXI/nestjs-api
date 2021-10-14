import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(newUser);
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  deleteUser(id: string): void {
    this.usersRepository.delete(id);
  }
}
