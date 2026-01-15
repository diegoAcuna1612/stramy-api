import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Req, Res} from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('common')
export class CommonController {

    @Get('/status')
    index(@Req() request: Request, @Res() response: Response){
        console.log(request.url);
        response.status(200).json({
            status: 'ok',
        })
    }
    @Get('notfound')
    @HttpCode(404)
    notFoundPage(){
        return '404 Not Found';
    } 

    @Get('error')
    @HttpCode(500)
    errorPage(){
        return '500 Error';
    }

    @Get('/status/:status')
    getByStatus(@Param('status', ParseBoolPipe) status: boolean){
        console.log(typeof status);
        return status;
    }

    @Get('/ticket/:id')
    getByTicket(@Param('id', ParseIntPipe) id: number){
        console.log(typeof  id);
        return id+10;
    }
}
