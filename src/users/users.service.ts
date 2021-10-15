import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleInput } from 'src/roles/dto/create-role.input';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  createUser(
    createUserInput: CreateUserInput,
    createRoleInput: CreateRoleInput,
  ): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);

    const role = this.rolesRepository.create(createRoleInput);

    newUser.role = role;

    return this.usersRepository.save(newUser);
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail(email);
  }

  deleteUser(id: string): void {
    this.usersRepository.delete(id);
  }
}
