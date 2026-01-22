import { Body, Controller, Post } from '@nestjs/common';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Controller('test')
export class TestController {
    constructor(private readonly bcrypt: BcryptService) {
    }

    @Post()
    async test(@Body() data: any) {
        const password ='123sadas45';
        const hash = '$2b$10$Fb.azd0weTZo9AIumIEgvue0nSF8Vv.iuZWEJV0dLoRD1UJUaa5/G';

        return await  this.bcrypt.compare(password,hash);
    }
}
