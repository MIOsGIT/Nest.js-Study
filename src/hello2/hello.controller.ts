import { Controller, Get, Patch, Post, Body, Query } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Board, transferDTO, user } from 'src/DTO/transfer';
import { Hi_Res, responseDTO } from 'src/DTO/reponse';

@Controller('hello')
export class HelloController {
  private readonly helloService: HelloService;

    constructor(_helloService: HelloService) {
      this.helloService = _helloService;
    }

  // @Get()
  // getHello(): string {
  //   return this.helloService.getHello();
  // }

  @Get('/hardlogin')
  logIn(@Body() body : transferDTO){
    return this.helloService.logIn(body);
  }

  // @Get()
  // logIn(@Query() login : transferDTO){
  //   return this.helloService.logIn(login);
  // }

  @Patch('/update')
  UpdateUser(@Body() updateduser: user) {
    return this.helloService.UpdateUser(updateduser);
  }

  // @Post()
  // CreateUser()

  @Post('/createboard')
  CreateBoard(@Body() body: Board) {
    return this.helloService.CreateBoard(body);
  }

  @Get('/Hello')
  Hello(@Body() body : Hi_Res){
    return this.helloService.Hi(body);
  }
}