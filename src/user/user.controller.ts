import { Controller, Get, Patch, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Board_Req, User_Req } from 'src/dto/request';
import { Board_Res, User_Res } from 'src/dto/reponse';
import { board_create_reponse_dto } from 'src/dto/board.create.reponse';
import { user_create_request_dto } from 'src/dto/user.create.request';
import { user_update_request_dto } from 'src/dto/user.update.request';
import { user_delete_request_dto } from 'src/dto/user.delete.request';


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

    @Post()
    create_user(@Body() body: user_create_request_dto){
    return this.userService.create_user(body);
    }

    @Patch()
    update_user(@Body() body: user_update_request_dto){
    this.userService.update_user(body);
    return `This action updates a ${body.id}`;
    }

    @Delete()
    remote_user(@Body() body: user_delete_request_dto){
    this.userService.remove_user(body);
    }
}
