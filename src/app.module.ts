import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello2/hello.module';
import { MainModule } from './main/main.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './hello2/entity/user.entity';

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
    HelloModule, MainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
