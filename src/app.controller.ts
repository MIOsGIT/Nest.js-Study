import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    private readonly appService: AppService

    constructor(_appService: AppService) {
        this.appService = _appService;
    }

    @Get()
    getHello(): string {
    return this.appService.getHello();
    }
}