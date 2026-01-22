import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.sessionsService.getAll({userId});
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Param('userId') userId: string) {
    return this.sessionsService.getOne({id,userId});
  }


  /*

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
    }*/

/*
  @Patch(':id')
  update(@Param('id') id: string,@Param('userId') userId: string,@Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update({id,userId},updateSessionDto);
  }*/

  @Delete(':id')
  delete(@Param('id') id: string,@Param('userId') userId: string) {
    return this.sessionsService.delete({id,userId});
  }

  @Delete()
  deleteAll(@Param('userId') userId: string) {
    return this.sessionsService.deleteAll({userId});
  }

}
