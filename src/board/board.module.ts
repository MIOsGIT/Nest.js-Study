import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_ } from '../user/entity/user.entity';
import { Board_ } from './entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User_, Board_], 'second')],
  exports: [TypeOrmModule],
  providers: [BoardService],
  controllers: [BoardController],

})
export class BoardModule {}
