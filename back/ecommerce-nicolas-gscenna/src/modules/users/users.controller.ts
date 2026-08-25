import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { IdParamDto } from 'src/dto/id-param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query('page')page: string='1',@Query('limit')limit: string='5') {
    return this.usersService.getUsers(Number(page),Number(limit));
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUsersById(@Param()params: IdParamDto){
    const user = await this.usersService.getUserById(params.id)
    if(!user) throw new NotFoundException ('Usuario no encontrado')
    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param()params: IdParamDto,@Body() user: CreateUserDto){
    const userToUpdate = await this.usersService.getUserById(params.id)
    if(!userToUpdate) throw new NotFoundException ('Usuario no encontrado')
    return this.usersService.updateUser(params.id,user);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param()params: IdParamDto){
    const user = await this.usersService.getUserById(params.id)
    if(!user) throw new NotFoundException ('Usuario no encontrado')
    return this.usersService.deleteUser(params.id);
  }
}
