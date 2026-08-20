import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page')page:string='1',@Query('limit')limit:string='5') {
    return this.usersService.getUsers(Number(page),Number(limit));
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  getUsersById(@Param('id')id: string){
    return this.usersService.getUserById(Number(id));
  }
  @Post()
  createUser(@Body() user: CreateUserDto){
    return this.usersService.createUser(user);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id')id: string,@Body() user: CreateUserDto){
    return this.usersService.updateUser(Number(id),user);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id')id: string){
    return this.usersService.deleteUser(Number(id));
  }
}
