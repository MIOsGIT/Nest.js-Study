import { Controller, Get, Patch, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Board, transferDTO, user, CreateUserDto } from 'src/dto/request';
import { Hi_Res, responseDTO, CreateUserDto_Res } from 'src/dto/reponse';
import { User } from './entity/user.entity';

@Controller('hello')
export class HelloController {
  private readonly helloService: HelloService;

    constructor(_helloService: HelloService) {
      this.helloService = _helloService;
    }

    @Get()
    findAll(): Promise<CreateUserDto_Res[]> {
      return this.helloService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<CreateUserDto_Res | null> {
      return this.helloService.findOne(id);
    }

    @Post()
    create(@Body() user:CreateUserDto){
      return this.helloService.create(user);
    }

    @Patch(':id')
    update(@Param('id')id: string, @Body() user: CreateUserDto_Res){
      //this.helloService.update(id, user);
      return `This action updates a #${id}`;
    }

    @Delete(':id')
    remote(@Param('id') id:string){
      this.helloService.remove(id);
    }


  // @Get()
  // getHello(): string {
  //   return this.helloService.getHello();
  // }

  // @Get('/hardlogin')
  // logIn(@Body() body : transferDTO){
  //   return this.helloService.logIn(body);
  // }

  // // @Get()
  // // logIn(@Query() login : transferDTO){
  // //   return this.helloService.logIn(login);
  // // }

  // @Patch('/update')
  // UpdateUser(@Body() updateduser: user) {
  //   return this.helloService.UpdateUser(updateduser);
  // }

  // // @Post()
  // // CreateUser()

  // @Post('/createboard')
  // CreateBoard(@Body() body: Board) {
  //   return this.helloService.CreateBoard(body);
  // }

  // @Get('/Hello')
  // Hello(@Body() body : Hi_Res){
  //   return this.helloService.Hi(body);
  // }
}