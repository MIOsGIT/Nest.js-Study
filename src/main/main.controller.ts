import { Controller } from "@nestjs/common";
import { MainService } from "./main.service";

@Controller()
export class MainController {
    private readonly mainservice : MainService;

    constructor (_mainservice : MainService){
        this.mainservice = _mainservice;
    }
}