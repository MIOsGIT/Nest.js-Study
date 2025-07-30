import { Controller, Get, Patch, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Board_Req, User_Req } from 'src/dto/request';
import { Board_Res, User_Res } from 'src/dto/reponse';
import { board_create_reponse_dto } from 'src/dto/board.create.reponse';


@Controller('user')
export class UserController {
    private readonly userService: UserService;
    constructor(_userService: UserService) {
    this.userService = _userService;
    }

    @Get()
    findAll_user(): Promise<User_Res[]> {
    return this.userService.findAll_user();
    }

    @Get(':id')
    findOne_user(@Param('id') id: string): Promise<User_Res | null> {
    return this.userService.findOne_user(id);
    }

    @Post()
    create_user(@Body() user:User_Req){
    return this.userService.create_user(user);
    }

    @Patch(':id')
    update_user(@Param('id')id: string, @Body() user: User_Res){
    this.userService.update_user(id, user);
    return `This action updates a #${id}`;
    }

    @Delete(':id')
    remote_user(@Param('id') id:string){
    this.userService.remove_user(id);
    }
}
