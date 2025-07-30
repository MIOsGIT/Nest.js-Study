import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello2/hello.module';
import { MainModule } from './main/main.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './hello2/entity/user.entity';
import { BoardModule } from './board/board.module';
import { User_ } from './user/entity/user.entity';
import { Board } from './dto/request';
import { Board_ } from './board/entity/board.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'alwnalwn',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'second',
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'alwnalwn',
      database: 'board',
      entities: [User_, Board_],
      synchronize: true,
    }),
    HelloModule, MainModule, BoardModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
