import { Controller, Get, Patch, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board_Req, User_Req } from 'src/dto/request';
import { Board_Res, User_Res } from 'src/dto/reponse';
import { board_create_reponse_dto } from 'src/dto/board.create.reponse';
import { board_findone_request_dto } from 'src/dto/board.findone.request';
import { Board_ } from './entity/board.entity';
import { board_update_request_dto } from 'src/dto/board.update.request';
import { board_delete_request_dto } from 'src/dto/board.delete.request';

@Controller('board')
export class BoardController {
    private readonly boardService: BoardService;
    constructor(_BoardService: BoardService) {
    this.boardService = _BoardService;
    }

    //게시물
    @Get('/All')
    findAll(): Promise<Board_[]> {
    return this.boardService.findAll();
    }

    @Get()
    findOne(@Body() body: board_findone_request_dto) {
    return this.boardService.findOneByUserId(body);
    }

    @Post()
    create(@Body() body: board_create_reponse_dto){
    return this.boardService.create(body);
    }

    @Patch()
    update(@Body() body: board_update_request_dto){
    this.boardService.update(body);
    return `This action updates a ${body.user_id} / ${body.number}`;
    }

    @Delete()
    remote(@Body() body: board_delete_request_dto){
    this.boardService.remove(body);
    }
}
