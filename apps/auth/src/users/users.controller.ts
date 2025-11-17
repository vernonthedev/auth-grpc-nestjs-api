import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  UserService,
  PaginationDto,
  User,
  Users,
  UserServiceServiceName,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
export class UsersController implements UserService {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(UserServiceServiceName, 'CreateUser')
  CreateUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod(UserServiceServiceName, 'FindAllUsers')
  FindAllUsers(): Promise<Users> {
    return this.usersService.findAll();
  }

  @GrpcMethod(UserServiceServiceName, 'FindOneUser')
  FindOneUser(findOneUserDto: FindOneUserDto): Promise<User> {
    return this.usersService.findOne(findOneUserDto.id);
  }

  @GrpcMethod(UserServiceServiceName, 'UpdateUser')
  UpdateUser(updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod(UserServiceServiceName, 'RemoveUser')
  RemoveUser(findOneUserDto: FindOneUserDto): Promise<User> {
    return this.usersService.remove(findOneUserDto.id);
  }

  @GrpcStreamMethod(UserServiceServiceName, 'QueryUsers')
  QueryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
