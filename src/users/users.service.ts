import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleInput } from 'src/roles/dto/create-role.input';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(
    createUserInput: CreateUserInput,
    createRoleInput: CreateRoleInput,
  ): Promise<User> {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    const newUser = this.usersRepository.create(createUserInput);

    const role = this.rolesService.createRole(createRoleInput);

    newUser.role = role;

    return this.usersRepository.save(newUser);
  }

  findOne(email: string): Promise<User> {
    console.log(email);
    return this.usersRepository.findOneOrFail({ where: { email: email } });
  }

  deleteUser(id: string): void {
    this.usersRepository.delete(id);
  }
}
