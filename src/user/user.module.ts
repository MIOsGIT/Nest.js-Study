import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User_ } from '../user/entity/user.entity';
import { Board_ } from 'src/board/entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User_, Board_], 'second')],
  exports: [TypeOrmModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
