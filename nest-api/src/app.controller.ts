import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('')
    test() {
        return "hello world" + process.env.TEST;
    }
}